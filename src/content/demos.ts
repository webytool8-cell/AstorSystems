import type { PhotoKey } from "./photos";

/**
 * Demonstration projects. These are interactive prototypes running on sample data in the
 * browser. They illustrate what Astor Systems builds; they are NOT client implementations.
 */
export interface Demo {
  slug: string;
  title: string;
  shortTitle: string;
  industry: string;
  industryName: string;
  summary: string;
  intro: string;
  photo: PhotoKey;
  shows: string[];
  /** Technologies a production version would typically use. */
  stack: string[];
  workflow: string;
  solution: string;
}

export const demos: Demo[] = [
  {
    slug: "ai-receptionist",
    title: "AI Receptionist for Home Services",
    shortTitle: "AI Receptionist",
    industry: "plumbing-hvac",
    industryName: "Home services",
    summary: "Watch an AI receptionist answer a call, collect job details, qualify the caller and route the job.",
    intro:
      "Pick a call scenario and press play. The left panel shows the conversation; the right panel shows what the system captures and does in the background.",
    photo: "receptionist",
    shows: [
      "Collecting name, address, service and urgency",
      "Checking the caller is inside the service area",
      "Escalating emergencies to an on-call person",
      "Creating a lead and sending a confirmation text",
    ],
    stack: ["Twilio Voice", "Voice AI + OpenAI or Anthropic", "n8n", "CRM (e.g. HubSpot)"],
    workflow: "ai-call-intake-qualification",
    solution: "ai-assistants",
  },
  {
    slug: "cleaning-quotes-crm",
    title: "Quote-to-Booking System for a Cleaning Company",
    shortTitle: "Cleaning Quotes & CRM",
    industry: "cleaning-companies",
    industryName: "Cleaning companies",
    summary: "Request a quote as a customer, see an instant estimate, then watch the lead move through the pipeline.",
    intro:
      "Fill in the quote form as if you were a customer. The estimate updates as you type, and submitting it creates a lead with an automatic follow-up plan.",
    photo: "cleaning-companies",
    shows: [
      "A guided quote form that collects what you need to price",
      "Instant price ranges from your own pricing rules",
      "A pipeline board that updates automatically",
      "Scheduled follow-ups that stop when the customer replies",
    ],
    stack: ["Website form", "Make or n8n", "Airtable or HubSpot", "Twilio SMS"],
    workflow: "quote-request-to-crm",
    solution: "lead-management",
  },
  {
    slug: "maintenance-requests",
    title: "Maintenance Request Workflow for Property Managers",
    shortTitle: "Maintenance Requests",
    industry: "property-management",
    industryName: "Property management",
    summary: "Submit a tenant request, see it classified by trade and urgency, then move it through to completion.",
    intro:
      "Submit a maintenance request as a tenant. The system classifies it, creates a work order and assigns a vendor. Advance the work order to see the tenant updates that go out at each stage.",
    photo: "property-management",
    shows: [
      "Structured intake with unit, description and access permission",
      "Automatic classification by trade and urgency",
      "Emergency escalation to the on-call contact",
      "Status updates sent to the tenant at every stage",
    ],
    stack: ["Web form or SMS", "OpenAI or Anthropic", "n8n", "Airtable", "Twilio SMS"],
    workflow: "maintenance-request-intake",
    solution: "administrative-automation",
  },
];
