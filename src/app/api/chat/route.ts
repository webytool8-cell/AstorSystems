import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { PROPOSAL_TOOL_NAME, proposalSchema, proposalTool } from "@/lib/intake/proposal";
import { INTAKE_SYSTEM_PROMPT } from "@/lib/intake/system-prompt";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * AI intake chat.
 *
 * Protocol: POST { history, message } → newline-delimited JSON events:
 *   {t:"text", d}            streamed assistant text
 *   {t:"proposal", proposal} a validated proposal to render
 *   {t:"done", messages}     raw messages to append to the client's history
 *   {t:"error", message}     a user-facing error
 *
 * The client keeps the raw conversation (including thinking blocks, which must be
 * passed back unchanged) and sends it with each turn, so the server stays stateless.
 */

const MODEL = process.env.ASTOR_CHAT_MODEL || "claude-opus-5-5";
const FALLBACK_BETA = "server-side-fallback-2026-07-01";
const MAX_TOOL_ROUNDS = 3;

// --- Abuse limits (best-effort, per instance) ---------------------------------
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 40;
}

const allowedBlockTypes = new Set(["text", "thinking", "redacted_thinking", "tool_use", "tool_result", "fallback"]);
const blockSchema = z.looseObject({ type: z.string() }).refine((b) => allowedBlockTypes.has(b.type), "Unsupported content");
const bodySchema = z.object({
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.union([z.string().max(4000), z.array(blockSchema).max(20)]),
      }),
    )
    .max(60),
});

type MessageParam = Anthropic.Beta.BetaMessageParam;

/**
 * After a mid-output fallback, thinking/tool_use blocks before the final `fallback`
 * block must not be echoed back; the fallback block itself stays in place.
 */
function echoable(content: Anthropic.Beta.BetaContentBlock[]) {
  const boundary = content.map((b) => b.type as string).lastIndexOf("fallback");
  if (boundary < 0) return content;
  return content.filter(
    (b, i) => i >= boundary || !["thinking", "redacted_thinking", "tool_use"].includes(b.type as string),
  );
}

let client: Anthropic | null = null;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "The AI assistant isn't configured yet." }, { status: 503 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "You're sending messages quickly. Please wait a few minutes and try again." }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > 400_000) return Response.json({ error: "This conversation is too long. Please start a new one." }, { status: 413 });
  let parsed;
  try {
    parsed = bodySchema.safeParse(JSON.parse(raw));
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });

  const history = parsed.data.history as MessageParam[];
  if (history.length > 0 && (history[0].role !== "user" || history[history.length - 1].role !== "assistant")) {
    return Response.json({ error: "Invalid conversation state. Please start a new chat." }, { status: 400 });
  }

  client ??= new Anthropic();
  const anthropic = client;
  const userMessage: MessageParam = { role: "user", content: parsed.data.message };
  const encoder = new TextEncoder();

  const body = new ReadableStream({
    async start(controller) {
      const send = (event: object) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      const added: MessageParam[] = [userMessage];

      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const stream = anthropic.beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 16000,
              betas: [FALLBACK_BETA],
              fallbacks: "default",
              output_config: { effort: "medium" },
              cache_control: { type: "ephemeral" },
              system: [{ type: "text", text: INTAKE_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
              tools: [proposalTool],
              // After the last allowed tool round, the model must reply in text.
              ...(round >= MAX_TOOL_ROUNDS ? { tool_choice: { type: "none" as const } } : {}),
              messages: [...history, ...added],
            },
            { signal: request.signal },
          );
          stream.on("text", (d) => send({ t: "text", d }));
          const message = await stream.finalMessage();

          if (message.stop_reason === "refusal") {
            const text = "Sorry — I can't help with that here. Tell me about your business and what you'd like to improve, or use our contact page to reach the team.";
            send({ t: "text", d: text });
            added.push({ role: "assistant", content: text });
            break;
          }

          added.push({ role: "assistant", content: echoable(message.content) } as unknown as MessageParam);

          const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
          if (toolUses.length === 0 || message.stop_reason !== "tool_use") {
            if (toolUses.length > 0) {
              // Truncated (max_tokens) tool call: never run it; close it out so history stays valid.
              added.push({
                role: "user",
                content: toolUses.map((tu) => ({ type: "tool_result" as const, tool_use_id: tu.id, is_error: true, content: "Tool input was truncated and not used." })),
              });
              continue;
            }
            break;
          }

          const results: Anthropic.Beta.BetaToolResultBlockParam[] = toolUses.map((tu) => {
            if (tu.name !== PROPOSAL_TOOL_NAME) {
              return { type: "tool_result", tool_use_id: tu.id, is_error: true, content: `Unknown tool ${tu.name}.` };
            }
            const check = proposalSchema.safeParse(tu.input);
            if (!check.success) {
              const issues = check.error.issues.slice(0, 6).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
              return { type: "tool_result", tool_use_id: tu.id, is_error: true, content: `Proposal rejected by validation: ${issues}. Fix these and call create_proposal again.` };
            }
            send({ t: "proposal", proposal: check.data });
            return { type: "tool_result", tool_use_id: tu.id, content: "The proposal is now displayed to the visitor next to the chat." };
          });
          added.push({ role: "user", content: results });
          send({ t: "break" });
        }

        // History must end with an assistant turn.
        if (added[added.length - 1].role !== "assistant") {
          const text = "Your proposal is ready — take a look, and tell me if you'd like to change anything.";
          send({ t: "text", d: text });
          added.push({ role: "assistant", content: text });
        }
        send({ t: "done", messages: added });
      } catch (error) {
        let message = "Something went wrong on our side. Please try again in a moment.";
        if (error instanceof Anthropic.RateLimitError) message = "The assistant is busy right now. Please try again in a minute.";
        else if (error instanceof Anthropic.BadRequestError) message = "This conversation couldn't be continued. Please start a new chat.";
        else if (error instanceof Anthropic.APIUserAbortError) message = "Request cancelled.";
        if (!(error instanceof Anthropic.APIUserAbortError)) console.error("[chat]", error);
        send({ t: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
