import { z } from "zod";

/**
 * The only way the assistant may talk to the visitor besides the proposal:
 * one short question with tap-to-answer options. Keeps replies short and on-script.
 */
export const QUESTION_TOOL_NAME = "ask_question";

export const questionSchema = z.object({
  acknowledgement: z.string().trim().max(200),
  question: z.string().trim().min(5).max(200),
  options: z.array(z.string().trim().min(1).max(60)).min(2).max(5),
  multiSelect: z.boolean(),
});
export type Question = z.infer<typeof questionSchema>;

export const questionTool = {
  name: QUESTION_TOOL_NAME,
  description:
    "Ask the visitor ONE short question, with 2–5 tap-to-answer options. Use only when the answer would change the recommendation and you cannot yet create a useful proposal.",
  strict: true,
  input_schema: {
    type: "object" as const,
    additionalProperties: false,
    required: ["acknowledgement", "question", "options", "multiSelect"],
    properties: {
      acknowledgement: { type: "string", description: "At most one short, warm sentence reflecting what the visitor said. Empty string if nothing to acknowledge." },
      question: { type: "string", description: "One plain-English question, under 20 words." },
      options: { type: "array", items: { type: "string" }, description: "2–5 likely answers, each under 6 words. The visitor can also type their own." },
      multiSelect: { type: "boolean", description: "True when several options can apply (e.g. which tools they use)." },
    },
  },
};

/** Coerce a question into bounds instead of spending another model call on it. */
export function normaliseQuestion(input: unknown): Question | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
  const options = Array.isArray(raw.options) ? raw.options.map((o) => clip(o, 60)).filter(Boolean).slice(0, 5) : [];
  const parsed = questionSchema.safeParse({
    acknowledgement: clip(raw.acknowledgement, 200),
    question: clip(raw.question, 200),
    options,
    multiSelect: raw.multiSelect === true,
  });
  return parsed.success ? parsed.data : null;
}
