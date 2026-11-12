/**
 * Content model for the Astor Systems website.
 *
 * All public content is stored as typed data in `src/content/*` and read through
 * `src/lib/content.ts`. The accessors are the only thing pages depend on, so content
 * can later move to Supabase (or a CMS / admin dashboard) without touching page code.
 */

export type StepKind = "trigger" | "ai" | "action" | "condition" | "notify" | "record";

/** One node in a visual workflow diagram. */
export interface WorkflowStep {
  kind: StepKind;
  /** Short label shown on the node, e.g. "Classify request". */
  label: string;
  /** Tool or system performing the step, e.g. "Twilio" or "CRM". */
  tool?: string;
  /** One-line explanation used in the step list beneath the diagram. */
  detail?: string;
}

export type IconName =
  | "message"
  | "funnel"
  | "calendar"
  | "inbox"
  | "document"
  | "chart"
  | "book"
  | "assistant"
  | "plug"
  | "building"
  | "wrench"
  | "pipe"
  | "sparkle"
  | "hammer"
  | "truck"
  | "scissors"
  | "briefcase"
  | "heart"
  | "phone";

export interface Solution {
  slug: string;
  /** Category name as shown in the directory, e.g. "Customer Communication". */
  name: string;
  icon: IconName;
  /** Problem-oriented one-liner used on cards. */
  tagline: string;
  /** Page H1. */
  headline: string;
  metaTitle: string;
  metaDescription: string;
  problem: { summary: string; points: string[] };
  description: string[];
  steps: WorkflowStep[];
  capabilities: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  /** Integration slugs typically involved. */
  integrations: string[];
  /** Non-platform requirements (e.g. "A business phone number"). */
  requirements: string[];
  implementation: { title: string; description: string }[];
  industries: string[];
  workflows: string[];
}

export interface Industry {
  slug: string;
  name: string;
  /** Short label for nav / cards, e.g. "Property Management". */
  shortName: string;
  icon: IconName;
  /** Illustrative notification shown on industry cards (sample content, not a real customer). */
  preview: { app: string; title: string; body: string; tone: "accent" | "mint" | "sun" | "violet" };
  headline: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  challenges: { title: string; description: string }[];
  scenario: { title: string; today: string[]; withSystems: string[] };
  solutions: { title: string; description: string; solution: string }[];
  /** Typical software already in use, used to frame integrations. */
  commonTools: string[];
  workflows: string[];
  featured?: boolean;
}

export type AutomationPlatform = "n8n" | "make" | "zapier";
export type Difficulty = "Starter" | "Intermediate" | "Advanced";
export type BusinessFunction =
  | "Sales"
  | "Customer Service"
  | "Operations"
  | "Finance"
  | "Administration";

/**
 * Access status for a workflow. Structured so paid templates and bundles can be added
 * later without changing the shape of existing records.
 */
export type WorkflowAccess =
  | { status: "implementation"; note?: string }
  | { status: "coming-soon" }
  | { status: "free"; downloadUrl?: string }
  | { status: "paid"; priceUsd: number; checkoutUrl?: string };

export interface Workflow {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  description: string[];
  industries: string[];
  /** Solution slug the workflow belongs to. */
  category: string;
  function: BusinessFunction;
  platforms: AutomationPlatform[];
  integrations: string[];
  difficulty: Difficulty;
  steps: WorkflowStep[];
  access: WorkflowAccess;
  /** Rough implementation effort, shown as guidance only. */
  setupEstimate: string;
  outcomes: string[];
  featured?: boolean;
}

export type IntegrationStatus = "supported" | "planned";

export type IntegrationCategory =
  | "AI Models"
  | "Automation Platforms"
  | "Communication"
  | "Productivity Suites"
  | "CRM & Sales"
  | "Scheduling"
  | "Payments"
  | "Data & Databases";

export interface Integration {
  slug: string;
  name: string;
  /** Two-character monogram used in place of third-party logos. */
  mark: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  summary: string;
  description: string;
  functions: string[];
  connectsTo: string[];
  examples: string[];
  solutions: string[];
  website: string;
}
