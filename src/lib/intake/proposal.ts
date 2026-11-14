import { z } from "zod";
import { industries } from "@/content/industries";
import { integrations } from "@/content/integrations";
import { solutions } from "@/content/solutions";
import { workflows } from "@/content/workflows";

/**
 * Preliminary proposal produced by the intake assistant. Every reference (solution,
 * workflow, integration, industry) must exist in the site catalog: the tool schema lists
 * them as enums and the server re-validates with this schema before anything is shown.
 */

const slugs = <T extends { slug: string }>(items: T[]) => items.map((i) => i.slug) as [string, ...string[]];

export const industrySlugs = [...slugs(industries), "other"] as [string, ...string[]];
export const solutionSlugs = slugs(solutions);
export const workflowSlugs = slugs(workflows);
export const integrationSlugs = slugs(integrations);
export const phases = ["start-here", "next", "later"] as const;

const shortText = z.string().trim().min(1).max(400);

export const proposedSystemSchema = z.object({
  name: z.string().trim().min(3).max(80),
  solution: z.enum(solutionSlugs),
  problem: shortText,
  howItWorks: shortText,
  workflows: z.array(z.enum(workflowSlugs)).max(4),
  integrations: z.array(z.enum(integrationSlugs)).max(6),
  phase: z.enum(phases),
});

export const proposalSchema = z.object({
  businessName: z.string().trim().max(120),
  industry: z.enum(industrySlugs),
  summary: z.string().trim().min(10).max(700),
  goals: z.array(shortText).min(1).max(5),
  currentTools: z.array(z.string().trim().min(1).max(80)).max(10),
  systems: z.array(proposedSystemSchema).min(1).max(5),
  quickWin: shortText,
  openQuestions: z.array(shortText).max(5),
});

export type Proposal = z.infer<typeof proposalSchema>;
export type ProposedSystem = z.infer<typeof proposedSystemSchema>;

export const PROPOSAL_TOOL_NAME = "create_proposal";

/**
 * JSON Schema for the tool. Strict mode: every property required, no extra properties.
 * Size limits are enforced server-side with zod rather than in the schema.
 */
export const proposalTool = {
  name: PROPOSAL_TOOL_NAME,
  description:
    "Create (or revise) the visitor's preliminary proposal. Call it as soon as you know what kind of business it is and at least one concrete problem to solve. The proposal is shown as a structured card. Only reference solutions, workflows and integrations from the catalog. When revising, send the full updated proposal.",
  strict: true,
  input_schema: {
    type: "object" as const,
    additionalProperties: false,
    required: ["businessName", "industry", "summary", "goals", "currentTools", "systems", "quickWin", "openQuestions"],
    properties: {
      businessName: { type: "string", description: "The business name if the visitor gave one, otherwise an empty string." },
      industry: { type: "string", enum: industrySlugs, description: "Closest industry slug from the catalog, or 'other'." },
      summary: { type: "string", description: "2–3 plain-English sentences summarising the visitor's situation and what they want to change." },
      goals: { type: "array", items: { type: "string" }, description: "1–5 concrete outcomes the visitor wants, in their own terms." },
      currentTools: { type: "array", items: { type: "string" }, description: "Software and tools the visitor said they use today." },
      systems: {
        type: "array",
        description: "1–5 recommended systems, ordered by priority.",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["name", "solution", "problem", "howItWorks", "workflows", "integrations", "phase"],
          properties: {
            name: { type: "string", description: "Short, plain-English name, e.g. 'Missed-call follow-up'." },
            solution: { type: "string", enum: solutionSlugs, description: "Solution category slug from the catalog." },
            problem: { type: "string", description: "The visitor's specific problem this system addresses." },
            howItWorks: { type: "string", description: "One or two sentences on what the system does, tailored to the visitor." },
            workflows: { type: "array", items: { type: "string", enum: workflowSlugs }, description: "0–4 catalog workflow slugs this system is built from. Empty if it would be fully custom." },
            integrations: { type: "array", items: { type: "string", enum: integrationSlugs }, description: "Catalog integration slugs involved. Prefer tools the visitor already uses." },
            phase: { type: "string", enum: [...phases], description: "start-here for the first project, then next, then later." },
          },
        },
      },
      quickWin: { type: "string", description: "The single change likely to make the quickest visible difference." },
      openQuestions: { type: "array", items: { type: "string" }, description: "0–5 things to clarify on a consultation call." },
    },
  },
};
