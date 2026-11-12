import type { Solution } from "./types";

const standardImplementation = {
  template: {
    title: "Configured template",
    description:
      "Start from a proven workflow from our library, configured for your accounts, wording and routing rules. Fastest path when your process is close to the standard pattern.",
  },
  custom: {
    title: "Custom implementation",
    description:
      "We map your current process, design the system around it and build, test and document it with your team. Best when your operation has its own rules or several systems involved.",
  },
  managed: {
    title: "Managed service",
    description:
      "Ongoing monitoring, maintenance and improvement after launch, so integrations keep working when apps, APIs or your business change.",
  },
};

const implementation = [standardImplementation.template, standardImplementation.custom, standardImplementation.managed];

export const solutions: Solution[] = [
  {
    slug: "customer-communication",
    name: "Customer Communication",
    icon: "message",
    tagline: "Respond to every customer quickly and consistently, without staff living in their inbox.",
    headline: "Customer communication that keeps up with your business",
    metaTitle: "Customer Communication Automation for Small Businesses",
    metaDescription:
      "Automated customer inquiries, SMS updates, missed-call text-back and review requests for service businesses. Faster replies without adding staff.",
    problem: {
      summary:
        "Most small businesses lose work not because of price or quality, but because a message went unanswered or a customer was left wondering what happens next.",
      points: [
        "Calls go to voicemail while staff are on a job, and many callers never leave a message.",
        "Inquiries arrive by phone, text, email, web form and social media, with no single place to see them.",
        "Customers call back to ask for status updates that could have been sent automatically.",
        "Follow-up and review requests depend on someone remembering to send them.",
      ],
    },
    description: [
      "We connect your communication channels into a single, organised flow. Every inquiry is captured, acknowledged within seconds and routed to the right person with the details they need.",
      "Routine updates such as confirmations, “on the way” notices, completion messages and review requests are sent automatically, in your wording, at the right moment. Staff step in for the conversations that need a person.",
    ],
    steps: [
      { kind: "trigger", label: "Inquiry received", tool: "Phone, SMS, form, email", detail: "Any channel feeds the same intake process." },
      { kind: "ai", label: "Identify request", tool: "AI model", detail: "Determines service type, urgency and missing details." },
      { kind: "action", label: "Acknowledge", tool: "Twilio / Email", detail: "Customer receives an immediate, specific reply." },
      { kind: "record", label: "Log conversation", tool: "CRM", detail: "History is stored against the customer record." },
      { kind: "notify", label: "Route to staff", tool: "SMS / Teams", detail: "The right person is notified with a summary." },
    ],
    capabilities: [
      { title: "Missed-call text-back", description: "Automatically text callers you could not answer, with a link to book or describe their need." },
      { title: "Unified inquiry intake", description: "Phone, SMS, email and web forms land in one organised queue." },
      { title: "Status notifications", description: "Confirmations, reminders, arrival windows and completion messages sent without manual effort." },
      { title: "Review requests", description: "Timed requests after completed work, sent only to customers who had a good experience." },
    ],
    benefits: [
      { title: "Fewer lost leads", description: "Every caller and form submission gets a response, even after hours." },
      { title: "Less phone tag", description: "Proactive updates reduce “just checking in” calls." },
      { title: "Consistent tone", description: "Messages follow your approved wording every time." },
      { title: "Clear history", description: "Anyone on the team can see what was said and when." },
    ],
    integrations: ["twilio", "openai", "google-workspace", "hubspot", "n8n", "make"],
    requirements: [
      "A business phone number (existing numbers can often be forwarded or ported)",
      "Approved message wording for each customer touchpoint",
      "A place to keep customer records (spreadsheet, CRM or Airtable)",
    ],
    implementation,
    industries: ["auto-repair", "plumbing-hvac", "contractors-home-services", "property-management", "barbershops-salons"],
    workflows: ["missed-call-text-back", "tenant-status-updates", "review-request-after-job", "service-reminder-campaign"],
  },
  {
    slug: "lead-management",
    name: "Lead Management",
    icon: "funnel",
    tagline: "Capture every lead, qualify it consistently and follow up until there is an answer.",
    headline: "Lead capture and follow-up that never forgets",
    metaTitle: "Automated Lead Capture & Follow-Up for Service Businesses",
    metaDescription:
      "Automated lead follow-up, quote request handling and CRM updates for contractors, cleaning companies and service businesses.",
    problem: {
      summary:
        "Service businesses spend real money generating leads, then lose a large share of them to slow responses and inconsistent follow-up.",
      points: [
        "Quote requests sit in an inbox until someone has time to read them.",
        "Leads are tracked in memory, notebooks or scattered spreadsheets.",
        "Estimates are sent once and never followed up.",
        "There is no clear view of where leads come from or which ones convert.",
      ],
    },
    description: [
      "We build a lead pipeline that captures inquiries from every source, asks for the information you need to quote, scores and organises each lead and keeps follow-up moving on a schedule you define.",
      "Your team sees a clean list of who to call next and why. Owners see how many leads came in, from where, and what happened to them.",
    ],
    steps: [
      { kind: "trigger", label: "Lead submitted", tool: "Web form / Ads / Email", detail: "Captured from any source with origin recorded." },
      { kind: "ai", label: "Qualify", tool: "AI model + rules", detail: "Checks service area, job type and budget fit." },
      { kind: "record", label: "Create lead", tool: "CRM / Airtable", detail: "Structured record with all collected details." },
      { kind: "condition", label: "Qualified?", detail: "Qualified leads get a booking link; others a polite reply." },
      { kind: "action", label: "Follow-up sequence", tool: "Email / SMS", detail: "Timed reminders until the lead responds or closes." },
    ],
    capabilities: [
      { title: "Multi-source capture", description: "Website forms, ad platforms, email and phone inquiries flow into one pipeline." },
      { title: "Lead qualification", description: "Consistent rules for service area, job size and fit, applied instantly." },
      { title: "Estimate follow-up", description: "Automated, polite follow-up on open quotes with staff tasks when a call is needed." },
      { title: "Source reporting", description: "Know which channels produce paying customers, not just inquiries." },
    ],
    benefits: [
      { title: "Faster response", description: "Leads hear back in minutes rather than hours or days." },
      { title: "More closed quotes", description: "Consistent follow-up recovers estimates that would otherwise go quiet." },
      { title: "Less admin", description: "No copying details between inboxes, notes and spreadsheets." },
      { title: "Better decisions", description: "Clear data on which marketing actually pays off." },
    ],
    integrations: ["hubspot", "airtable", "make", "zapier", "openai", "twilio", "calendly"],
    requirements: [
      "Your qualification criteria (service area, job types, minimums)",
      "Follow-up timing and message wording you are comfortable with",
      "Access to the forms or ad accounts that generate leads",
    ],
    implementation,
    industries: ["cleaning-companies", "contractors-home-services", "moving-companies", "plumbing-hvac"],
    workflows: ["quote-request-to-crm", "estimate-follow-up-sequence", "ai-call-intake-qualification"],
  },
  {
    slug: "scheduling-appointments",
    name: "Scheduling & Appointments",
    icon: "calendar",
    tagline: "Let customers book themselves and cut no-shows with timely reminders.",
    headline: "Scheduling without the back-and-forth",
    metaTitle: "Appointment Scheduling Automation for Service Businesses",
    metaDescription:
      "Online booking, automated reminders and rescheduling flows for auto shops, salons, cleaning companies and service businesses.",
    problem: {
      summary:
        "Scheduling by phone ties up staff, invites errors and leaves gaps in the calendar when customers forget or cancel late.",
      points: [
        "Booking requires several calls or messages to find a time.",
        "No-shows and late cancellations leave paid staff idle.",
        "Calendars live in different places for different staff members.",
        "Rescheduling means starting the conversation over.",
      ],
    },
    description: [
      "We connect online booking to the calendars your team already uses, collect the details needed for each appointment type and send confirmations and reminders automatically.",
      "When plans change, customers can confirm, reschedule or cancel from a text message, and your team sees the update immediately.",
    ],
    steps: [
      { kind: "trigger", label: "Booking made", tool: "Calendly / Booking page", detail: "Customer chooses an available slot." },
      { kind: "record", label: "Create appointment", tool: "Calendar + CRM", detail: "Added to the right staff calendar and customer record." },
      { kind: "action", label: "Confirm", tool: "SMS / Email", detail: "Confirmation with prep instructions." },
      { kind: "action", label: "Remind", tool: "Twilio", detail: "Reminder 24 hours and 2 hours before, with reply options." },
      { kind: "condition", label: "Reply received?", detail: "Reschedule requests update the calendar automatically." },
    ],
    capabilities: [
      { title: "Self-service booking", description: "Real availability, appointment types and intake questions in one link." },
      { title: "Reminders with replies", description: "Customers confirm or reschedule by replying to a text." },
      { title: "Staff assignment", description: "Round-robin or skill-based assignment across team members." },
      { title: "Waitlist fill", description: "Offer cancelled slots to customers who wanted an earlier time." },
    ],
    benefits: [
      { title: "Fewer no-shows", description: "Timely reminders with easy confirmation reduce missed appointments." },
      { title: "Staff time back", description: "Front-desk time shifts from booking calls to serving customers." },
      { title: "Fuller calendar", description: "Cancellations are refilled instead of becoming idle time." },
      { title: "Fewer errors", description: "No double bookings or mistyped phone numbers." },
    ],
    integrations: ["calendly", "google-workspace", "microsoft-365", "twilio", "zapier"],
    requirements: [
      "A list of appointment types, durations and who can perform them",
      "Staff calendars in Google or Microsoft",
      "Cancellation and rescheduling policy",
    ],
    implementation,
    industries: ["auto-repair", "barbershops-salons", "cleaning-companies", "nonprofits"],
    workflows: ["appointment-reminders-sms", "volunteer-shift-scheduling", "booking-no-show-recovery"],
  },
  {
    slug: "administrative-automation",
    name: "Administrative Automation",
    icon: "inbox",
    tagline: "Remove the repetitive data entry, copying and chasing that fills the working day.",
    headline: "Take repetitive admin off your team’s plate",
    metaTitle: "Administrative & Back-Office Automation for Small Businesses",
    metaDescription:
      "Automate data entry, request intake, task assignment and internal notifications. Business process automation built around how your team actually works.",
    problem: {
      summary:
        "In most small businesses, skilled people spend hours each week moving information from one place to another.",
      points: [
        "The same details are typed into email, spreadsheets, invoices and job sheets.",
        "Requests are assigned by phone or memory and sometimes not at all.",
        "Managers chase status updates instead of managing.",
        "New staff take weeks to learn undocumented processes.",
      ],
    },
    description: [
      "We map how work moves through your business today, then automate the hand-offs: intake, data entry, task assignment, notifications and status tracking.",
      "The result is a clear, repeatable process where information is entered once and appears wherever it is needed.",
    ],
    steps: [
      { kind: "trigger", label: "Request arrives", tool: "Form / Email", detail: "Structured intake replaces free-form messages." },
      { kind: "ai", label: "Categorise", tool: "AI model", detail: "Sorts by type and priority, fills obvious fields." },
      { kind: "record", label: "Create task", tool: "Airtable / Sheets", detail: "One record with all details and attachments." },
      { kind: "action", label: "Assign", tool: "Rules engine", detail: "Assigned by type, location or workload." },
      { kind: "notify", label: "Notify & track", tool: "SMS / Email", detail: "Assignee notified, status tracked to completion." },
    ],
    capabilities: [
      { title: "Request intake", description: "Structured forms and email parsing that capture complete information the first time." },
      { title: "Automatic assignment", description: "Route work by category, location, skill or current workload." },
      { title: "Internal notifications", description: "The right people are told about the right events, without noise." },
      { title: "Onboarding checklists", description: "New customers and staff follow a consistent, automated sequence." },
    ],
    benefits: [
      { title: "Hours recovered", description: "Less re-typing and chasing every week, for every person." },
      { title: "Fewer dropped tasks", description: "Nothing depends on someone remembering." },
      { title: "Documented process", description: "The system itself describes how work is done." },
      { title: "Room to grow", description: "Handle more volume without proportional admin headcount." },
    ],
    integrations: ["n8n", "make", "airtable", "google-workspace", "microsoft-365", "openai"],
    requirements: [
      "A walkthrough of the current process with the people who do it",
      "Access to the tools involved (or a sandbox account)",
      "Agreed rules for assignment and escalation",
    ],
    implementation,
    industries: ["property-management", "professional-services", "cleaning-companies", "moving-companies"],
    workflows: ["maintenance-request-intake", "vendor-dispatch-coordination", "new-client-onboarding"],
  },
  {
    slug: "document-processing",
    name: "Document Processing",
    icon: "document",
    tagline: "Extract, file and act on invoices, forms and paperwork automatically.",
    headline: "Paperwork that files itself",
    metaTitle: "Document Processing & Invoice Automation",
    metaDescription:
      "Automated invoice processing, document extraction and file organisation for property managers, professional services and small businesses.",
    problem: {
      summary:
        "Invoices, applications, work orders and agreements still arrive as PDFs and photos that someone has to read, rename, file and re-key.",
      points: [
        "Staff manually read documents and type values into other systems.",
        "Files are saved with inconsistent names in inconsistent places.",
        "Important dates in contracts and certificates are missed.",
        "Finding a document takes longer than it should.",
      ],
    },
    description: [
      "We set up a pipeline that receives documents from email or upload, extracts the information that matters, validates it and files the document in a consistent structure.",
      "Extracted data flows into your spreadsheet, accounting tool or database, and exceptions are flagged for a person to review rather than silently guessed.",
    ],
    steps: [
      { kind: "trigger", label: "Document received", tool: "Email / Upload", detail: "PDF, image or scan arrives." },
      { kind: "ai", label: "Extract fields", tool: "AI model", detail: "Vendor, dates, amounts, reference numbers." },
      { kind: "condition", label: "Confidence check", detail: "Low-confidence values are sent for human review." },
      { kind: "record", label: "File & log", tool: "Drive / SharePoint", detail: "Renamed and stored in the right folder; data logged." },
      { kind: "notify", label: "Flag deadlines", tool: "Calendar / Email", detail: "Due dates and expirations become reminders." },
    ],
    capabilities: [
      { title: "Invoice extraction", description: "Pull vendor, amount, due date and line items from invoices." },
      { title: "Consistent filing", description: "Standard naming and folder structure applied automatically." },
      { title: "Human review queue", description: "Uncertain results go to a person instead of into your books." },
      { title: "Expiry tracking", description: "Insurance certificates, leases and contracts generate reminders." },
    ],
    benefits: [
      { title: "Less re-keying", description: "Data is typed zero times instead of several." },
      { title: "Findable files", description: "Every document is where you expect it to be." },
      { title: "Fewer missed dates", description: "Renewals and payments surface before they are due." },
      { title: "Audit trail", description: "A log shows what was received, extracted and filed." },
    ],
    integrations: ["openai", "anthropic", "google-workspace", "microsoft-365", "n8n"],
    requirements: [
      "Sample documents of each type to be processed",
      "The fields you need extracted and where they should go",
      "A defined review owner for exceptions",
    ],
    implementation,
    industries: ["property-management", "professional-services", "nonprofits"],
    workflows: ["invoice-document-processing"],
  },
  {
    slug: "business-intelligence",
    name: "Business Intelligence",
    icon: "chart",
    tagline: "See what is happening in the business without assembling reports by hand.",
    headline: "Clear numbers, delivered automatically",
    metaTitle: "Business Reporting & Dashboards for Small Businesses",
    metaDescription:
      "Automated business reporting, daily digests and simple dashboards that consolidate data from your CRM, scheduling and accounting tools.",
    problem: {
      summary:
        "Owners make decisions on instinct because the numbers are spread across several tools and nobody has time to pull them together.",
      points: [
        "Reports are assembled manually, if at all.",
        "Each tool shows a partial picture.",
        "Problems such as slow response times or rising cancellations are noticed late.",
        "Nobody is sure the numbers are accurate.",
      ],
    },
    description: [
      "We consolidate data from the systems you already use into a single reporting layer, then deliver the numbers that matter in the format you will actually read: a morning email, a weekly summary or a simple dashboard.",
      "We focus on a small number of operational measures you can act on, rather than charts for their own sake.",
    ],
    steps: [
      { kind: "trigger", label: "Scheduled run", tool: "Daily / Weekly", detail: "Runs automatically at a set time." },
      { kind: "action", label: "Collect data", tool: "CRM, Calendar, Stripe", detail: "Pulls figures from each connected tool." },
      { kind: "record", label: "Consolidate", tool: "Airtable / Supabase", detail: "Stored in one consistent structure." },
      { kind: "ai", label: "Summarise", tool: "AI model", detail: "Plain-language highlights and anomalies." },
      { kind: "notify", label: "Deliver", tool: "Email / Dashboard", detail: "The owner receives a concise report." },
    ],
    capabilities: [
      { title: "Daily operations digest", description: "Yesterday’s leads, jobs, cancellations and revenue in one email." },
      { title: "Lead source tracking", description: "Which channels produce customers, not just clicks." },
      { title: "Simple dashboards", description: "A handful of measures that matter, updated automatically." },
      { title: "Exception alerts", description: "Be told when something drifts outside normal ranges." },
    ],
    benefits: [
      { title: "Informed decisions", description: "Pricing, staffing and marketing choices backed by data." },
      { title: "Early warnings", description: "Spot problems in days rather than months." },
      { title: "No manual reporting", description: "Reports assemble themselves." },
      { title: "One version of the truth", description: "Everyone sees the same numbers." },
    ],
    integrations: ["airtable", "supabase", "google-workspace", "stripe", "hubspot", "anthropic"],
    requirements: [
      "Read access to the systems that hold your data",
      "A short list of the decisions you want the numbers to support",
    ],
    implementation,
    industries: ["professional-services", "property-management", "auto-repair", "cleaning-companies"],
    workflows: ["daily-operations-digest"],
  },
  {
    slug: "internal-knowledge-systems",
    name: "Internal Knowledge Systems",
    icon: "book",
    tagline: "Make procedures, policies and answers available to everyone on the team instantly.",
    headline: "Your team’s knowledge, organised and searchable",
    metaTitle: "Internal Knowledge Base & AI Policy Assistant",
    metaDescription:
      "Organise procedures and policies into a searchable internal knowledge system with an AI assistant that answers staff questions from your own documents.",
    problem: {
      summary:
        "Critical knowledge lives in a few people’s heads and in documents nobody can find, so the same questions are asked and answered every week.",
      points: [
        "New staff interrupt experienced staff for routine answers.",
        "Policies exist in several versions across email and shared drives.",
        "Procedures are inconsistent between people and locations.",
        "Knowledge leaves when an employee does.",
      ],
    },
    description: [
      "We gather your procedures, policies, pricing rules and FAQs into an organised, maintained knowledge base, then add an assistant that answers staff questions using only that material and links to the source.",
      "The system makes clear when it does not know, and the knowledge base stays editable by your team.",
    ],
    steps: [
      { kind: "trigger", label: "Staff question", tool: "Chat / Teams / Web", detail: "Asked in plain language." },
      { kind: "action", label: "Search knowledge", tool: "Document index", detail: "Finds the relevant procedures and policies." },
      { kind: "ai", label: "Compose answer", tool: "Claude / GPT", detail: "Answers only from your material, with sources." },
      { kind: "condition", label: "Answer found?", detail: "If not, the question is routed to a manager." },
      { kind: "record", label: "Log gaps", tool: "Airtable", detail: "Unanswered questions show what to document next." },
    ],
    capabilities: [
      { title: "Knowledge base setup", description: "Structure and consolidate your existing documents." },
      { title: "Policy assistant", description: "Staff get sourced answers in seconds." },
      { title: "Gap tracking", description: "See which questions are not yet covered." },
      { title: "Access control", description: "Restrict sensitive material to the right roles." },
    ],
    benefits: [
      { title: "Faster onboarding", description: "New hires find answers without waiting." },
      { title: "Consistency", description: "Everyone follows the current version of a procedure." },
      { title: "Fewer interruptions", description: "Senior staff spend less time repeating answers." },
      { title: "Retained knowledge", description: "Expertise is captured, not lost." },
    ],
    integrations: ["anthropic", "openai", "google-workspace", "microsoft-365", "supabase"],
    requirements: [
      "Existing documents, even if disorganised",
      "A content owner who approves what goes into the knowledge base",
    ],
    implementation,
    industries: ["professional-services", "nonprofits", "property-management"],
    workflows: ["internal-policy-assistant"],
  },
  {
    slug: "ai-assistants",
    name: "AI Assistants",
    icon: "assistant",
    tagline: "AI receptionists and assistants that handle routine conversations and hand off the rest.",
    headline: "AI assistants with a clear job to do",
    metaTitle: "AI Receptionist & AI Assistants for Small Businesses",
    metaDescription:
      "AI receptionist and AI assistants for small businesses: answer calls, collect details, qualify leads and book appointments, with clear hand-off to staff.",
    problem: {
      summary:
        "Small teams cannot answer every call and message during working hours, let alone after hours, yet each missed conversation may be a lost customer.",
      points: [
        "Calls are missed while staff are with customers or on site.",
        "After-hours inquiries wait until the next morning.",
        "Front-desk staff spend most of their time on the same few questions.",
        "Generic chatbots frustrate customers and damage trust.",
      ],
    },
    description: [
      "We design AI assistants around a defined set of tasks: answering common questions from your approved information, collecting the details needed for a job, qualifying the inquiry and booking or routing it.",
      "Every assistant has explicit boundaries. It identifies itself as automated, escalates to a person when needed and records every conversation so your team has full context.",
    ],
    steps: [
      { kind: "trigger", label: "Call or message", tool: "Twilio / Web chat", detail: "Customer reaches the business." },
      { kind: "ai", label: "Understand need", tool: "Voice AI + LLM", detail: "Identifies service and collects details." },
      { kind: "condition", label: "Within scope?", detail: "Emergencies and complex cases go to a person." },
      { kind: "action", label: "Book or route", tool: "Calendar / CRM", detail: "Books a slot or creates a qualified lead." },
      { kind: "notify", label: "Summary to staff", tool: "SMS / Email", detail: "Transcript and summary sent to the team." },
    ],
    capabilities: [
      { title: "AI receptionist", description: "Answers calls, collects details and books or routes inquiries." },
      { title: "Website assistant", description: "Answers questions from your approved information and captures leads." },
      { title: "Clear escalation", description: "Defined rules for when a person takes over." },
      { title: "Conversation records", description: "Transcripts and summaries saved to the customer record." },
    ],
    benefits: [
      { title: "Always available", description: "Inquiries are handled at 7 p.m. and on weekends." },
      { title: "Focused staff", description: "People handle the conversations that need judgement." },
      { title: "Complete intake", description: "Every inquiry arrives with the details needed to act." },
      { title: "Controlled behaviour", description: "Assistants work from approved information only." },
    ],
    integrations: ["openai", "anthropic", "twilio", "n8n", "hubspot", "google-workspace"],
    requirements: [
      "Approved answers to common questions, services and pricing guidance",
      "Escalation rules and on-call contacts",
      "A business phone number or website where the assistant will operate",
    ],
    implementation,
    industries: ["contractors-home-services", "plumbing-hvac", "auto-repair", "property-management"],
    workflows: ["ai-call-intake-qualification", "missed-call-text-back"],
  },
  {
    slug: "software-api-integrations",
    name: "Software & API Integrations",
    icon: "plug",
    tagline: "Connect the tools you already pay for so information flows between them.",
    headline: "Make your software work together",
    metaTitle: "Custom API Integrations & Software Connections",
    metaDescription:
      "Custom API integrations that connect CRMs, scheduling, accounting and industry software so information flows without manual re-entry.",
    problem: {
      summary:
        "Most businesses use several good tools that do not talk to each other, so people become the integration layer.",
      points: [
        "Customer details are kept in three or four places that disagree.",
        "Industry software lacks the connectors you need.",
        "Off-the-shelf integrations break silently.",
        "Switching systems feels impossible because data is trapped.",
      ],
    },
    description: [
      "We build reliable connections between your systems using native connectors where they exist and custom API integrations where they do not.",
      "Integrations are monitored, documented and designed to fail loudly, so problems are noticed and fixed rather than discovered weeks later.",
    ],
    steps: [
      { kind: "trigger", label: "Event in System A", tool: "Webhook / Poll", detail: "A record is created or updated." },
      { kind: "action", label: "Transform data", tool: "n8n / Custom code", detail: "Fields mapped and validated." },
      { kind: "action", label: "Write to System B", tool: "API", detail: "Record created or updated in the target." },
      { kind: "condition", label: "Succeeded?", detail: "Failures are retried and then escalated." },
      { kind: "notify", label: "Monitor", tool: "Alerts", detail: "Errors alert the support owner." },
    ],
    capabilities: [
      { title: "System-to-system sync", description: "Keep customers, jobs and invoices consistent across tools." },
      { title: "Custom API work", description: "Connect industry software that lacks off-the-shelf connectors." },
      { title: "Data migration", description: "Move clean data when changing systems." },
      { title: "Monitoring", description: "Health checks and alerts on every integration we run." },
    ],
    benefits: [
      { title: "Single source of truth", description: "Information agrees across systems." },
      { title: "Less re-entry", description: "Data is entered once." },
      { title: "Reliability", description: "Failures are caught and handled, not hidden." },
      { title: "Freedom to change", description: "Swap tools without rebuilding everything." },
    ],
    integrations: ["n8n", "supabase", "stripe", "hubspot", "airtable", "microsoft-365"],
    requirements: [
      "API access or admin rights to each system",
      "Agreement on which system is authoritative for each type of data",
    ],
    implementation,
    industries: ["professional-services", "property-management", "auto-repair"],
    workflows: ["paid-invoice-crm-sync"],
  },
];
