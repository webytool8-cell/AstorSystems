import type { Integration } from "./types";

/**
 * Integration directory.
 *
 * IMPORTANT: `status` is a business claim. Only mark an integration "supported" once an
 * implementation using it has been built and tested end to end. Everything else stays
 * "planned". Third-party names are used descriptively; no logos or endorsements implied.
 */
export const integrations: Integration[] = [
  {
    slug: "n8n",
    name: "n8n",
    mark: "n8",
    category: "Automation Platforms",
    status: "supported",
    summary: "Open-source workflow automation that can be self-hosted for full control of data and cost.",
    description:
      "n8n is a node-based workflow automation platform. It can run in the cloud or on infrastructure the business controls, which makes it a strong fit for workflows that handle sensitive customer data, need custom code steps, or run at volumes where per-task pricing becomes expensive.",
    functions: [
      "Multi-step workflows with branching and error handling",
      "Webhooks for receiving form submissions and app events",
      "Custom JavaScript steps for data transformation",
      "AI agent and language model nodes",
      "Self-hosting for data residency and cost control",
    ],
    connectsTo: ["openai", "anthropic", "twilio", "google-workspace", "microsoft-365", "airtable", "hubspot", "supabase", "stripe"],
    examples: [
      "Receive a maintenance request webhook, classify it with an AI model, and create a work order in Airtable",
      "Nightly job that compiles the day's leads and sends a summary to the owner",
      "Route inbound SMS replies from Twilio to the right staff member",
    ],
    solutions: ["administrative-automation", "software-api-integrations", "lead-management"],
    website: "https://n8n.io",
  },
  {
    slug: "make",
    name: "Make",
    mark: "Mk",
    category: "Automation Platforms",
    status: "supported",
    summary: "Visual automation platform with a large catalog of ready-made app connectors.",
    description:
      "Make (formerly Integromat) builds automations as visual scenarios. Its extensive app catalog and clear visual editor make it a practical choice when a business wants to see and adjust its own automations after handover.",
    functions: [
      "Visual scenario builder that non-developers can follow",
      "Pre-built connectors for thousands of business apps",
      "Scheduling, routers and filters for conditional logic",
      "Data stores for lightweight state between runs",
    ],
    connectsTo: ["google-workspace", "microsoft-365", "airtable", "hubspot", "calendly", "stripe", "openai", "twilio"],
    examples: [
      "Send quote requests from a website form into a shared spreadsheet and notify the estimator",
      "Create a customer record and welcome email when an invoice is paid",
    ],
    solutions: ["lead-management", "customer-communication", "administrative-automation"],
    website: "https://www.make.com",
  },
  {
    slug: "zapier",
    name: "Zapier",
    mark: "Zp",
    category: "Automation Platforms",
    status: "supported",
    summary: "Widely used automation service, ideal for simple, reliable app-to-app connections.",
    description:
      "Zapier connects business applications through trigger-and-action automations called Zaps. Many small businesses already have an account, and it is well suited to straightforward integrations that need to be dependable and easy to maintain.",
    functions: [
      "Trigger-based automations between thousands of apps",
      "Multi-step Zaps with filters and paths",
      "Built-in formatter for dates, text and numbers",
      "Low maintenance for simple, high-value connections",
    ],
    connectsTo: ["google-workspace", "microsoft-365", "hubspot", "calendly", "stripe", "airtable", "openai"],
    examples: [
      "Add every new Calendly booking to the CRM and send an SMS confirmation",
      "Post new five-star review requests into a team channel",
    ],
    solutions: ["scheduling-appointments", "lead-management"],
    website: "https://zapier.com",
  },
  {
    slug: "openai",
    name: "OpenAI",
    mark: "OA",
    category: "AI Models",
    status: "supported",
    summary: "Language models for classification, drafting, extraction and conversational assistants.",
    description:
      "OpenAI's API provides language models that can read and write text, extract structured data from messages and documents, and power conversational assistants. In Astor Systems implementations AI is used for specific, reviewable tasks rather than open-ended decisions.",
    functions: [
      "Classifying inbound requests by type and urgency",
      "Extracting fields from emails, forms and documents",
      "Drafting replies for staff to review and send",
      "Powering chat and voice assistants grounded in business information",
    ],
    connectsTo: ["n8n", "make", "zapier", "twilio", "supabase"],
    examples: [
      "Read an incoming email and extract name, address, service and preferred time",
      "Summarise a long tenant message into a one-line work order title",
    ],
    solutions: ["ai-assistants", "document-processing", "customer-communication"],
    website: "https://openai.com/api",
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    mark: "An",
    category: "AI Models",
    status: "supported",
    summary: "Claude models for careful reasoning over long documents and well-structured outputs.",
    description:
      "Anthropic's Claude models are well suited to reading long documents, following detailed instructions and returning consistent structured output. They are a good fit for internal knowledge assistants and document-heavy workflows.",
    functions: [
      "Answering staff questions from internal policies and procedures",
      "Reviewing and summarising long documents such as leases or contracts",
      "Producing structured JSON for downstream automation",
      "Drafting customer communications in a consistent tone",
    ],
    connectsTo: ["n8n", "make", "supabase", "google-workspace"],
    examples: [
      "Internal assistant that answers “what is our policy on…” from the company handbook",
      "Summarise a vendor contract and flag renewal dates",
    ],
    solutions: ["internal-knowledge-systems", "ai-assistants", "document-processing"],
    website: "https://www.anthropic.com/api",
  },
  {
    slug: "twilio",
    name: "Twilio",
    mark: "Tw",
    category: "Communication",
    status: "supported",
    summary: "Programmable SMS and voice for confirmations, reminders and call handling.",
    description:
      "Twilio provides programmable phone numbers, SMS and voice. It is the communication layer behind appointment reminders, two-way text conversations with customers and AI-assisted call handling.",
    functions: [
      "Sending and receiving SMS from a business number",
      "Inbound call routing and voicemail capture",
      "Voice applications for AI receptionist experiences",
      "Delivery status tracking for every message",
    ],
    connectsTo: ["n8n", "make", "zapier", "openai", "hubspot", "airtable"],
    examples: [
      "Text a customer when their technician is on the way",
      "Capture missed calls and reply automatically with a booking link",
    ],
    solutions: ["customer-communication", "scheduling-appointments", "ai-assistants"],
    website: "https://www.twilio.com",
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    mark: "GW",
    category: "Productivity Suites",
    status: "supported",
    summary: "Gmail, Calendar, Drive, Sheets and Forms as the operational backbone of many small businesses.",
    description:
      "Many small businesses already run on Google Workspace. Automations can read and send Gmail, manage Calendar events, organise files in Drive and keep Sheets up to date, often removing the need for a separate system.",
    functions: [
      "Reading inbound Gmail and labelling or routing messages",
      "Creating and updating Calendar appointments",
      "Filing documents into structured Drive folders",
      "Using Sheets as a lightweight operational database",
    ],
    connectsTo: ["n8n", "make", "zapier", "openai", "anthropic", "airtable", "calendly"],
    examples: [
      "File every signed agreement into a client folder and log it in a sheet",
      "Create a calendar event from a confirmed quote",
    ],
    solutions: ["document-processing", "administrative-automation", "business-intelligence"],
    website: "https://workspace.google.com",
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    mark: "MS",
    category: "Productivity Suites",
    status: "planned",
    summary: "Outlook, Teams, SharePoint and Excel for organisations standardised on Microsoft.",
    description:
      "For businesses on Microsoft 365, the same patterns apply: monitor Outlook inboxes, post alerts in Teams, store documents in SharePoint or OneDrive and maintain records in Excel.",
    functions: [
      "Outlook inbox monitoring and routing",
      "Teams notifications for internal alerts",
      "SharePoint and OneDrive document organisation",
      "Excel as a shared operational record",
    ],
    connectsTo: ["n8n", "make", "zapier", "openai"],
    examples: [
      "Post urgent maintenance requests into a Teams channel",
      "Save invoice attachments from Outlook into SharePoint by vendor",
    ],
    solutions: ["administrative-automation", "document-processing"],
    website: "https://www.microsoft.com/microsoft-365",
  },
  {
    slug: "airtable",
    name: "Airtable",
    mark: "At",
    category: "Data & Databases",
    status: "supported",
    summary: "Flexible database with spreadsheet familiarity, ideal as a central operational record.",
    description:
      "Airtable combines the familiarity of a spreadsheet with the structure of a database. It works well as the central record for jobs, leads, requests and vendors, with views tailored to each role.",
    functions: [
      "Central record for leads, jobs and service requests",
      "Role-specific views and simple interfaces",
      "Linked records between customers, properties and jobs",
      "Automation triggers when records change",
    ],
    connectsTo: ["n8n", "make", "zapier", "twilio", "google-workspace"],
    examples: [
      "Maintenance request board with status columns and assigned vendor",
      "Lead pipeline that updates automatically from website forms",
    ],
    solutions: ["lead-management", "business-intelligence", "administrative-automation"],
    website: "https://www.airtable.com",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    mark: "Hs",
    category: "CRM & Sales",
    status: "planned",
    summary: "CRM for contacts, deals and follow-up sequences, with a capable free tier.",
    description:
      "HubSpot provides contact management, deal pipelines and email tools. It is a common choice for service businesses formalising their sales process for the first time.",
    functions: [
      "Contact and company records",
      "Deal pipelines for quotes and estimates",
      "Task creation for follow-ups",
      "Email tracking and templates",
    ],
    connectsTo: ["n8n", "make", "zapier", "twilio", "calendly"],
    examples: [
      "Create a deal for every qualified quote request",
      "Assign a follow-up task when an estimate has been open for three days",
    ],
    solutions: ["lead-management", "customer-communication"],
    website: "https://www.hubspot.com",
  },
  {
    slug: "calendly",
    name: "Calendly",
    mark: "Ca",
    category: "Scheduling",
    status: "planned",
    summary: "Self-service booking pages that sync with staff calendars.",
    description:
      "Calendly lets customers pick an available time without back-and-forth. Bookings can trigger confirmations, CRM updates and preparation tasks.",
    functions: [
      "Online booking based on real availability",
      "Intake questions at booking time",
      "Round-robin assignment across staff",
      "Booking events that trigger automations",
    ],
    connectsTo: ["zapier", "make", "n8n", "hubspot", "google-workspace"],
    examples: [
      "Send a booking link automatically after a qualified inquiry",
      "Create a job record in Airtable when an estimate visit is booked",
    ],
    solutions: ["scheduling-appointments"],
    website: "https://calendly.com",
  },
  {
    slug: "stripe",
    name: "Stripe",
    mark: "St",
    category: "Payments",
    status: "planned",
    summary: "Online payments, invoices and deposits connected to the rest of the workflow.",
    description:
      "Stripe handles card payments, invoices and subscriptions. Payment events can confirm bookings, update records and trigger thank-you or onboarding messages.",
    functions: [
      "Deposits and payment links",
      "Invoices with automatic reminders",
      "Payment events that update other systems",
      "Recurring billing for maintenance plans",
    ],
    connectsTo: ["n8n", "make", "zapier", "supabase", "hubspot"],
    examples: [
      "Confirm a cleaning booking once a deposit is paid",
      "Mark a job as paid in the central record and send a review request",
    ],
    solutions: ["administrative-automation", "business-intelligence"],
    website: "https://stripe.com",
  },
  {
    slug: "supabase",
    name: "Supabase",
    mark: "Sb",
    category: "Data & Databases",
    status: "planned",
    summary: "Postgres database with authentication and APIs for custom business systems.",
    description:
      "Supabase provides a managed Postgres database, authentication and file storage. It is the foundation for custom portals and systems that outgrow spreadsheets or need real access control.",
    functions: [
      "Relational database for structured business data",
      "User authentication for customer or staff portals",
      "File storage for documents and photos",
      "Row-level security for multi-user access",
    ],
    connectsTo: ["n8n", "openai", "anthropic", "stripe"],
    examples: [
      "Tenant portal backed by a maintenance request database",
      "Reporting database that consolidates data from several tools",
    ],
    solutions: ["software-api-integrations", "business-intelligence", "internal-knowledge-systems"],
    website: "https://supabase.com",
  },
];
