import { z } from "zod";

/** Shared between the client forms and the API route so validation rules never drift. */

export const budgetOptions = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-plus", label: "$15,000+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const teamSizeOptions = [
  { value: "1-5", label: "1–5" },
  { value: "6-20", label: "6–20" },
  { value: "21-50", label: "21–50" },
  { value: "51-200", label: "51–200" },
  { value: "200+", label: "200+" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-plus-months", label: "3+ months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const contactTopics = [
  { value: "consultation", label: "Request a consultation" },
  { value: "workflow", label: "Ask about a workflow" },
  { value: "managed", label: "Managed automation services" },
  { value: "partnership", label: "Partnership inquiry" },
  { value: "general", label: "General question" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const required = (max: number, msg = "This field is required.") => text(max).min(1, msg);

const contactFields = {
  name: required(120, "Please enter your name."),
  email: z.string().trim().max(200).email("Please enter a valid email address."),
  phone: text(40).optional().default(""),
  company: text(160).optional().default(""),
  /** Page context the inquiry came from, e.g. "workflow:missed-call-text-back". */
  context: text(200).optional().default(""),
  /** Honeypot: real users never fill this in. */
  website: z.string().max(0).optional().default(""),
};

export const projectInquirySchema = z.object({
  kind: z.literal("project"),
  ...contactFields,
  company: required(160, "Please enter your business name."),
  industry: required(80, "Please select an industry."),
  teamSize: z.enum(values(teamSizeOptions)).or(z.literal("")).default(""),
  existingSoftware: text(2000).optional().default(""),
  problems: required(4000, "Please describe the problems you are facing."),
  tasks: required(4000, "Please tell us what you would like to automate."),
  outcome: text(2000).optional().default(""),
  budget: z.enum(values(budgetOptions), { message: "Please select a budget range." }),
  timeline: z.enum(values(timelineOptions)).or(z.literal("")).default(""),
  details: text(4000).optional().default(""),
});

export const contactInquirySchema = z.object({
  kind: z.literal("contact"),
  ...contactFields,
  topic: z.enum(values(contactTopics)).default("general"),
  message: required(4000, "Please include a short message."),
});

export const inquirySchema = z.discriminatedUnion("kind", [projectInquirySchema, contactInquirySchema]);

export type ProjectInquiry = z.infer<typeof projectInquirySchema>;
export type ContactInquiry = z.infer<typeof contactInquirySchema>;
export type Inquiry = z.infer<typeof inquirySchema>;

export type FieldErrors = Partial<Record<string, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/**
 * Lightweight qualification signals attached to every project inquiry so it can be
 * triaged quickly. These are hints for a person, not automated decisions.
 */
export function qualify(inquiry: Inquiry) {
  if (inquiry.kind !== "project") return { priority: "standard" as const, signals: [] as string[] };
  const signals: string[] = [];
  const answered = [inquiry.existingSoftware, inquiry.outcome, inquiry.details, inquiry.teamSize, inquiry.timeline, inquiry.phone].filter(
    Boolean,
  ).length;
  if (["5k-15k", "15k-plus"].includes(inquiry.budget)) signals.push("budget:established");
  if (inquiry.budget === "under-2k") signals.push("budget:starter");
  if (inquiry.timeline === "asap" || inquiry.timeline === "1-3-months") signals.push("timeline:near-term");
  if (inquiry.existingSoftware) signals.push("has-existing-tools");
  if (inquiry.problems.length + inquiry.tasks.length > 300) signals.push("detailed-brief");
  if (answered >= 4) signals.push("complete-profile");
  const priority =
    signals.includes("budget:established") && signals.includes("timeline:near-term") ? ("high" as const) : ("standard" as const);
  return { priority, signals };
}
