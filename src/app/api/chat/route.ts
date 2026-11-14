import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { authConfigured, userFromRequest } from "@/lib/auth/verify";
import { PROPOSAL_TOOL_NAME, proposalSchema, proposalTool } from "@/lib/intake/proposal";
import { QUESTION_TOOL_NAME, normaliseQuestion, questionTool } from "@/lib/intake/question";
import { INTAKE_SYSTEM_PROMPT } from "@/lib/intake/system-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * AI intake chat (signed-in users only).
 *
 * Every assistant turn is a forced tool call — either `ask_question` (one short
 * question with tap-to-answer options) or `create_proposal` — so replies are always
 * short and on-script. The server enforces the path to a proposal: after
 * MAX_QUESTIONS questions, and after a proposal exists, only `create_proposal` is
 * allowed.
 *
 * POST { history, message } with `Authorization: Bearer <Firebase ID token>`
 *   → { messages, reply: { type: "question", question, step, maxSteps } | { type: "proposal", proposal } }
 *
 * The client keeps the raw conversation and sends it back each turn (stateless server).
 */

const MODEL = process.env.ASTOR_CHAT_MODEL || "claude-haiku-5-5";
const MAX_QUESTIONS = 2;
const MAX_PROPOSALS = 4; // first proposal + 3 revisions
const USER_LIMIT = { windowMs: 60 * 60 * 1000, max: 30 };

const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < USER_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear();
  return recent.length > USER_LIMIT.max;
}

const allowedBlockTypes = new Set(["text", "thinking", "redacted_thinking", "tool_use", "tool_result"]);
const blockSchema = z.looseObject({ type: z.string() }).refine((b) => allowedBlockTypes.has(b.type), "Unsupported content");
const bodySchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.union([z.string().max(2000), z.array(blockSchema).max(12)]) }))
    .max(24),
});

type MessageParam = Anthropic.MessageParam;
const err = (status: number, error: string) => Response.json({ error }, { status });

function toolUsesOf(m: MessageParam | undefined) {
  if (!m || m.role !== "assistant" || !Array.isArray(m.content)) return [];
  return m.content.filter((b): b is Anthropic.ToolUseBlockParam => b.type === "tool_use");
}

let client: Anthropic | null = null;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return err(503, "The AI assistant isn't configured yet.");
  if (!authConfigured()) return err(503, "Sign-in isn't configured yet.");

  const user = await userFromRequest(request);
  if (!user) return err(401, "Please sign in to use the assistant.");
  if (rateLimited(`uid:${user.uid}`)) return err(429, "You've reached the hourly limit for the assistant. Please try again later, or send your proposal to our team.");

  const raw = await request.text();
  if (raw.length > 200_000) return err(413, "This conversation is too long. Please start over.");
  let parsed;
  try {
    parsed = bodySchema.safeParse(JSON.parse(raw));
  } catch {
    return err(400, "Invalid request.");
  }
  if (!parsed.success) return err(400, "Invalid request.");

  const history = parsed.data.history as MessageParam[];
  const message = parsed.data.message;
  if (history.length > 0 && (history[0].role !== "user" || history[history.length - 1].role !== "assistant")) {
    return err(400, "Invalid conversation state. Please start over.");
  }

  const pastToolUses = history.flatMap(toolUsesOf);
  const questionsAsked = pastToolUses.filter((t) => t.name === QUESTION_TOOL_NAME).length;
  const proposalsMade = pastToolUses.filter((t) => t.name === PROPOSAL_TOOL_NAME).length;
  if (proposalsMade >= MAX_PROPOSALS) {
    return err(429, "You've reached the number of revisions available here. Send your proposal to our team and we'll refine it with you.");
  }

  // Close the previous turn's tool call: a question's answer *is* its tool result.
  const pending = toolUsesOf(history[history.length - 1]);
  let userTurn: MessageParam;
  if (pending.length === 0) {
    userTurn = { role: "user", content: message };
  } else {
    const results: Anthropic.ToolResultBlockParam[] = pending.map((tu) => ({
      type: "tool_result",
      tool_use_id: tu.id,
      content: tu.name === QUESTION_TOOL_NAME ? message : "The proposal was shown to the visitor.",
    }));
    const answered = pending.some((tu) => tu.name === QUESTION_TOOL_NAME);
    userTurn = { role: "user", content: answered ? results : [...results, { type: "text", text: message }] };
  }

  client ??= new Anthropic();
  const added: MessageParam[] = [userTurn];
  let forceProposal = questionsAsked >= MAX_QUESTIONS || proposalsMade > 0;

  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 6000,
        output_config: { effort: "low" },
        cache_control: { type: "ephemeral" },
        system: [{ type: "text", text: INTAKE_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        tools: [questionTool, proposalTool],
        tool_choice: forceProposal
          ? { type: "tool", name: PROPOSAL_TOOL_NAME, disable_parallel_tool_use: true }
          : { type: "any", disable_parallel_tool_use: true },
        messages: [...history, ...added],
      });

      if (response.stop_reason === "refusal") {
        return err(422, "Sorry — I can only help with questions about your business and how to improve it. Could you rephrase?");
      }
      if (response.stop_reason === "max_tokens") {
        forceProposal = true;
        continue;
      }
      const toolUse = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
      if (!toolUse) {
        forceProposal = true;
        continue;
      }

      if (toolUse.name === QUESTION_TOOL_NAME) {
        const question = normaliseQuestion(toolUse.input);
        if (question) {
          added.push({ role: "assistant", content: response.content });
          return Response.json({ messages: added, reply: { type: "question", question, step: questionsAsked + 1, maxSteps: MAX_QUESTIONS } });
        }
        forceProposal = true; // unusable question: go straight to the proposal
        continue;
      }

      if (toolUse.name === PROPOSAL_TOOL_NAME) {
        const check = proposalSchema.safeParse(toolUse.input);
        if (check.success) {
          added.push({ role: "assistant", content: response.content });
          return Response.json({ messages: added, reply: { type: "proposal", proposal: check.data } });
        }
        // Give the model one chance to fix a proposal that failed validation.
        const issues = check.error.issues.slice(0, 6).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
        added.push({ role: "assistant", content: response.content });
        added.push({
          role: "user",
          content: [{ type: "tool_result", tool_use_id: toolUse.id, is_error: true, content: `Proposal rejected by validation: ${issues}. Call create_proposal again with these fixed.` }],
        });
        forceProposal = true;
      }
    }
    return err(502, "The assistant couldn't put that together. Please try again.");
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return err(503, "The assistant is busy right now. Please try again in a minute.");
    if (error instanceof Anthropic.BadRequestError) {
      console.error("[chat] bad request", error.message);
      return err(400, "This conversation couldn't be continued. Please start over.");
    }
    console.error("[chat]", error);
    return err(500, "Something went wrong on our side. Please try again.");
  }
}
