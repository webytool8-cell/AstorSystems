import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "property-management",
    name: "Property Management",
    shortName: "Property Management",
    icon: "building",
    preview: { app: "Maintenance", title: "Urgent: leak under kitchen sink", body: "Unit 4B · photo attached · on-call notified", tone: "sun" },
    headline: "Technology solutions for property management",
    intro:
      "Property managers coordinate tenants, owners, vendors and paperwork across many units. We build systems that capture maintenance requests completely, route them to the right vendor and keep everyone informed without constant phone calls.",
    metaTitle: "Property Management Workflow Automation",
    metaDescription:
      "Maintenance request intake, vendor dispatch, tenant notifications and document organisation for property management companies.",
    challenges: [
      { title: "Incomplete maintenance requests", description: "Requests arrive by phone, text and email without unit numbers, photos or access permission, so every request starts with follow-up questions." },
      { title: "Emergencies mixed with routine work", description: "A burst pipe and a squeaky door arrive in the same inbox. Urgent issues depend on someone noticing them." },
      { title: "Vendor coordination by phone", description: "Assigning, scheduling and confirming vendor visits consumes hours of calls and texts every week." },
      { title: "Constant status calls", description: "Tenants and owners call for updates because nothing tells them what is happening." },
      { title: "Scattered documents", description: "Leases, invoices, insurance certificates and inspection reports are spread across inboxes and drives." },
    ],
    scenario: {
      title: "A leak reported at 9:40 p.m.",
      today: [
        "A tenant texts the office number about water under the kitchen sink. The message sits unread until morning.",
        "The next day a property manager calls the tenant for details, then calls three plumbers to find one available.",
        "The tenant calls twice more asking for an update. The invoice arrives a week later and is typed into a spreadsheet.",
      ],
      withSystems: [
        "The tenant’s text is captured immediately. The system asks for the unit, a photo and whether water is actively leaking.",
        "An active leak is classed as an emergency and the on-call contact is alerted within minutes, with all details attached.",
        "The preferred plumber receives the job, accepts it, and the tenant is told when to expect them. The invoice is extracted and filed against the work order.",
      ],
    },
    solutions: [
      { title: "Maintenance request intake", description: "Structured intake by form or text with photos, classification and emergency escalation.", solution: "administrative-automation" },
      { title: "Tenant communication", description: "Automatic updates at each stage, from received to resolved.", solution: "customer-communication" },
      { title: "Vendor coordination", description: "Assign jobs by trade and property, collect acceptance and visit times automatically.", solution: "administrative-automation" },
      { title: "Document organisation", description: "Invoices, certificates and leases extracted, filed and tracked for key dates.", solution: "document-processing" },
      { title: "Owner reporting", description: "Regular summaries of open requests, costs and response times per property.", solution: "business-intelligence" },
    ],
    commonTools: ["Property management software", "Google Workspace or Microsoft 365", "Spreadsheets", "Business phone/SMS"],
    workflows: ["maintenance-request-intake", "vendor-dispatch-coordination", "tenant-status-updates", "invoice-document-processing"],
    featured: true,
  },
  {
    slug: "auto-repair",
    name: "Auto Repair & Automotive Services",
    shortName: "Auto Repair",
    icon: "wrench",
    preview: { app: "Service desk", title: "Your car is ready for pickup", body: "2019 Civic · brakes + oil change · pay online", tone: "mint" },
    headline: "Automation for auto repair shops",
    intro:
      "Service advisors juggle phones, walk-ins and technicians all day. We help shops answer every inquiry, keep bays full with timely reminders and update customers without pulling advisors away from the counter.",
    metaTitle: "Automation for Auto Repair Shops",
    metaDescription:
      "Appointment scheduling, service reminders, quote follow-ups, customer updates and review requests for auto repair shops.",
    challenges: [
      { title: "Phones ring during busy hours", description: "Advisors cannot answer every call while checking customers in and out, and missed calls become lost jobs." },
      { title: "“Is my car ready?” calls", description: "Customers call repeatedly for updates that could be sent automatically." },
      { title: "Approvals stall jobs", description: "Additional work waits on a customer callback, leaving vehicles on lifts." },
      { title: "Repeat service depends on memory", description: "Oil changes and scheduled maintenance rely on customers remembering." },
      { title: "Few reviews despite good work", description: "Satisfied customers rarely leave reviews unless asked at the right time." },
    ],
    scenario: {
      title: "A Tuesday morning rush",
      today: [
        "Six calls come in between 8 and 9 a.m. while the advisor checks in drop-offs. Three go to voicemail.",
        "A brake job is waiting on approval for additional work, but the customer has not picked up.",
        "A customer whose car was finished at 2 p.m. calls at 4 p.m. to ask if it is ready.",
      ],
      withSystems: [
        "Missed callers receive a text within seconds with a booking link, and replies arrive with the caller’s details.",
        "The approval request goes out by text with a clear description and price; the customer replies to approve.",
        "When the job is marked complete, the customer is told their car is ready, and a review request follows the next day.",
      ],
    },
    solutions: [
      { title: "Missed-call text-back", description: "Every unanswered call gets an immediate text with a way to book.", solution: "customer-communication" },
      { title: "Appointment scheduling", description: "Online booking with confirmations and reminders to reduce no-shows.", solution: "scheduling-appointments" },
      { title: "Service reminders", description: "Date- and mileage-based reminders that bring customers back.", solution: "customer-communication" },
      { title: "Quote request processing", description: "Collect vehicle details and symptoms upfront so estimates are faster.", solution: "lead-management" },
      { title: "Review requests", description: "Feedback after every visit, with review invitations for happy customers.", solution: "customer-communication" },
    ],
    commonTools: ["Shop management system", "Business phone/SMS", "Google Business Profile", "Google Calendar"],
    workflows: ["missed-call-text-back", "appointment-reminders-sms", "service-reminder-campaign", "review-request-after-job"],
    featured: true,
  },
  {
    slug: "plumbing-hvac",
    name: "Plumbing & HVAC",
    shortName: "Plumbing & HVAC",
    icon: "pipe",
    preview: { app: "Dispatch", title: "No heat — emergency call", body: "Service area ✓ · transferred to on-call tech", tone: "sun" },
    headline: "Automation for plumbing and HVAC companies",
    intro:
      "Plumbing and HVAC calls are often urgent, and they arrive while technicians are under a sink or on a roof. We help you answer every call, separate emergencies from routine work and keep maintenance customers coming back each season.",
    metaTitle: "Plumbing & HVAC Business Automation",
    metaDescription:
      "AI call handling, emergency routing, estimate follow-ups and seasonal maintenance reminders for plumbing and HVAC companies.",
    challenges: [
      { title: "Urgent calls while on a job", description: "Technicians cannot answer the phone mid-job, and urgent callers move on quickly." },
      { title: "After-hours emergencies", description: "Night and weekend calls need fast routing to whoever is on call." },
      { title: "Unqualified call volume", description: "Out-of-area or out-of-scope calls take as much time as good ones." },
      { title: "Estimates that go quiet", description: "Replacement and installation quotes need follow-up that rarely happens." },
      { title: "Seasonal maintenance", description: "Tune-up reminders before summer and winter are often skipped in busy periods." },
    ],
    scenario: {
      title: "No heat on a Saturday night",
      today: [
        "A homeowner calls at 10 p.m. and reaches voicemail. They call a competitor who answers.",
        "Monday’s voicemails include two out-of-area requests and one emergency that has since been fixed by someone else.",
      ],
      withSystems: [
        "An AI receptionist answers, confirms the address is in the service area and identifies a no-heat emergency.",
        "The call is transferred to the on-call technician with the caller’s details. Routine weekend inquiries become qualified leads for Monday.",
      ],
    },
    solutions: [
      { title: "AI-powered call handling", description: "Answer every call, collect details and route emergencies to a person.", solution: "ai-assistants" },
      { title: "Lead qualification", description: "Service area, job type and urgency checked before your team spends time.", solution: "lead-management" },
      { title: "Estimate follow-ups", description: "Consistent follow-up on replacement and installation quotes.", solution: "lead-management" },
      { title: "Maintenance reminders", description: "Seasonal tune-up campaigns sent to the right customers automatically.", solution: "customer-communication" },
    ],
    commonTools: ["Field service software", "Business phone", "Google Workspace", "Accounting software"],
    workflows: ["ai-call-intake-qualification", "missed-call-text-back", "estimate-follow-up-sequence", "service-reminder-campaign"],
    featured: true,
  },
  {
    slug: "cleaning-companies",
    name: "Cleaning Companies",
    shortName: "Cleaning Companies",
    icon: "sparkle",
    preview: { app: "Quotes", title: "New quote request: deep clean", body: "3 bed · 2 bath · est. $240–$290", tone: "accent" },
    headline: "Systems for cleaning companies",
    intro:
      "Residential and commercial cleaning businesses win on responsiveness and reliability. We automate quote requests, onboarding and scheduling so you can respond faster and keep a growing customer base organised.",
    metaTitle: "Automation for Cleaning Companies",
    metaDescription:
      "Quote request automation, customer onboarding, appointment coordination and follow-up communication for residential and commercial cleaning companies.",
    challenges: [
      { title: "Quotes need too much back-and-forth", description: "Pricing depends on size, rooms, frequency and condition, which customers rarely include in their first message." },
      { title: "Slow quote response", description: "Prospects request several quotes and usually book the first reasonable reply." },
      { title: "Onboarding details get lost", description: "Access codes, pets and preferences are scattered across texts and notes." },
      { title: "Schedule changes", description: "Rescheduling recurring cleans creates confusion for crews and customers." },
      { title: "Customer records in many places", description: "No single list of customers, frequencies and history." },
    ],
    scenario: {
      title: "A quote request on a Sunday afternoon",
      today: [
        "A prospect submits a contact form saying “need a quote for a deep clean.”",
        "On Monday someone emails back asking for square footage, rooms and timing. The prospect has already booked another company.",
      ],
      withSystems: [
        "The guided quote form collects property size, rooms, frequency and condition, and calculates a price range from your rules.",
        "The prospect receives an immediate acknowledgement with a ballpark range and a booking link. Your team sees a ready-to-quote lead on Monday morning, or a booked job.",
      ],
    },
    solutions: [
      { title: "Quote request automation", description: "Collect the details you need and respond with a price range immediately.", solution: "lead-management" },
      { title: "Customer onboarding", description: "Welcome messages, intake of access details and automatic record setup.", solution: "administrative-automation" },
      { title: "Appointment coordination", description: "Confirmations, reminders and easy rescheduling for recurring cleans.", solution: "scheduling-appointments" },
      { title: "Follow-up communication", description: "Feedback requests, review invitations and re-engagement messages.", solution: "customer-communication" },
      { title: "Customer database", description: "One organised record of every customer, property and visit.", solution: "business-intelligence" },
    ],
    commonTools: ["Scheduling app", "Spreadsheets", "Business phone/SMS", "Payment processor"],
    workflows: ["quote-request-to-crm", "new-client-onboarding", "appointment-reminders-sms", "review-request-after-job"],
    featured: true,
  },
  {
    slug: "contractors-home-services",
    name: "Contractors & Home Services",
    shortName: "Contractors & Home Services",
    icon: "hammer",
    preview: { app: "Leads", title: "Kitchen remodel inquiry", body: "Budget $25–40k · estimate visit booked Thu", tone: "violet" },
    headline: "Technology for contractors and home service businesses",
    intro:
      "Contractors and home service businesses run on the phone and the calendar. We build systems that handle incoming calls, qualify leads, schedule estimates and keep following up until there is a decision.",
    metaTitle: "Business Process Automation for Contractors",
    metaDescription:
      "AI call handling, lead qualification, job request intake, estimate scheduling and follow-ups for contractors and home service businesses.",
    challenges: [
      { title: "Owner-operator answering phones", description: "The person doing the work is also the person answering calls, so one always suffers." },
      { title: "Unqualified estimate visits", description: "Driving to estimates for jobs outside your scope or budget wastes days each month." },
      { title: "Estimates without follow-up", description: "Large quotes need several touchpoints, but the next job always comes first." },
      { title: "Customers want updates", description: "Homeowners expect to know when crews will arrive and what happens next." },
    ],
    scenario: {
      title: "A kitchen remodel inquiry during a job",
      today: [
        "The owner sees a missed call while on a roof and calls back three hours later. The homeowner has already scheduled two other contractors.",
        "An estimate is sent the following week and never followed up.",
      ],
      withSystems: [
        "The call is answered, project type, budget range and timeline are collected, and the homeowner is offered estimate times.",
        "After the estimate is sent, follow-up messages go out on schedule and the owner is prompted to call at the right moment.",
      ],
    },
    solutions: [
      { title: "AI-powered call handling", description: "Every call answered with job details collected and summarised.", solution: "ai-assistants" },
      { title: "Lead qualification", description: "Scope, budget and location checked before booking an estimate visit.", solution: "lead-management" },
      { title: "Job request intake", description: "Structured requests with photos and measurements.", solution: "lead-management" },
      { title: "Appointment scheduling", description: "Estimate visits booked into the right calendar automatically.", solution: "scheduling-appointments" },
      { title: "Estimate follow-ups", description: "Consistent, polite follow-up until there is a decision.", solution: "lead-management" },
      { title: "Customer notifications", description: "Arrival windows, progress updates and completion messages.", solution: "customer-communication" },
    ],
    commonTools: ["Estimating software", "Google Calendar", "Business phone", "Spreadsheets or CRM"],
    workflows: ["ai-call-intake-qualification", "quote-request-to-crm", "estimate-follow-up-sequence", "missed-call-text-back"],
    featured: true,
  },
  {
    slug: "moving-companies",
    name: "Moving Companies",
    shortName: "Moving Companies",
    icon: "truck",
    preview: { app: "Bookings", title: "Move confirmed for June 28", body: "2-bed apartment · 3rd floor · crew of 3", tone: "mint" },
    headline: "Automation for moving companies",
    intro:
      "Moving inquiries are time-sensitive and detail-heavy. We help moving companies collect inventory and logistics details upfront, respond quickly and keep customers informed through move day.",
    metaTitle: "Automation for Moving Companies",
    metaDescription:
      "Quote intake, inventory collection, follow-up and move-day communication automation for moving companies.",
    challenges: [
      { title: "Detail-heavy quotes", description: "Accurate quotes need dates, addresses, access details and inventory." },
      { title: "Price shopping", description: "Customers request several quotes; speed and clarity win." },
      { title: "Move-day coordination", description: "Customers want arrival times and crews need final details." },
      { title: "Seasonal peaks", description: "Inquiry volume spikes at month-end and in summer." },
    ],
    scenario: {
      title: "End-of-month inquiry surge",
      today: [
        "Inquiries pile up during the busiest week. Quotes go out days later, after customers have booked elsewhere.",
      ],
      withSystems: [
        "A guided form collects addresses, dates, home size, stairs and large items. Leads are prioritised by move date and every customer gets an immediate, specific reply.",
      ],
    },
    solutions: [
      { title: "Quote intake", description: "Collect inventory, access and date details in one structured request.", solution: "lead-management" },
      { title: "Follow-up sequences", description: "Polite, timely follow-up on every quote.", solution: "lead-management" },
      { title: "Move-day updates", description: "Crew arrival windows and confirmations by text.", solution: "customer-communication" },
      { title: "Booking administration", description: "Deposits, confirmations and crew assignment handled consistently.", solution: "administrative-automation" },
    ],
    commonTools: ["Moving CRM or spreadsheets", "Business phone/SMS", "Payment processor"],
    workflows: ["quote-request-to-crm", "estimate-follow-up-sequence", "missed-call-text-back", "review-request-after-job"],
  },
  {
    slug: "barbershops-salons",
    name: "Barbershops & Salons",
    shortName: "Barbershops & Salons",
    icon: "scissors",
    preview: { app: "Bookings", title: "Reminder: haircut tomorrow 3:00 PM", body: "Reply C to confirm or R to reschedule", tone: "accent" },
    headline: "Automation for barbershops and salons",
    intro:
      "Stylists and barbers should spend their time with clients, not on the phone. We set up booking, reminders and rebooking flows that keep chairs full and reduce no-shows.",
    metaTitle: "Appointment Automation for Barbershops & Salons",
    metaDescription:
      "Online booking, appointment reminders, no-show recovery and rebooking automation for barbershops and salons.",
    challenges: [
      { title: "Phones during appointments", description: "Answering calls mid-cut is disruptive; ignoring them loses bookings." },
      { title: "No-shows", description: "Every missed appointment is lost revenue for that chair." },
      { title: "Rebooking", description: "Regular clients drift when the next appointment is not booked." },
    ],
    scenario: {
      title: "A missed 3 p.m. appointment",
      today: ["The client does not arrive and the slot is lost. Nobody follows up."],
      withSystems: [
        "Reminders were sent the day before and that morning. If the client still misses the appointment, they receive a friendly rebooking link, and repeated no-shows are flagged.",
      ],
    },
    solutions: [
      { title: "Online booking", description: "Clients book by service and stylist with real availability.", solution: "scheduling-appointments" },
      { title: "Reminders", description: "Text reminders with confirm and reschedule options.", solution: "scheduling-appointments" },
      { title: "Rebooking & recovery", description: "Rebooking prompts and no-show follow-up.", solution: "customer-communication" },
    ],
    commonTools: ["Booking app", "Instagram / Google Business Profile", "Business phone"],
    workflows: ["appointment-reminders-sms", "booking-no-show-recovery", "missed-call-text-back", "review-request-after-job"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    shortName: "Professional Services",
    icon: "briefcase",
    preview: { app: "Onboarding", title: "New client: documents received", body: "Engagement signed · folder created · 2 items pending", tone: "violet" },
    headline: "Business systems for professional service firms",
    intro:
      "Accounting, legal, consulting and agency teams sell expertise, but lose hours to intake, document handling and status reporting. We automate the administrative layer so professionals spend time on client work.",
    metaTitle: "Workflow Automation for Professional Service Firms",
    metaDescription:
      "Client onboarding, document processing, internal knowledge assistants and reporting automation for accounting, legal and consulting firms.",
    challenges: [
      { title: "Client onboarding paperwork", description: "Engagement letters, intake forms and document requests are chased manually." },
      { title: "Document handling", description: "Client files arrive by email in every format and need sorting and filing." },
      { title: "Repeated internal questions", description: "Staff ask partners the same procedural questions." },
      { title: "Disconnected systems", description: "CRM, billing and project tools hold different versions of the truth." },
    ],
    scenario: {
      title: "Onboarding a new client",
      today: ["A coordinator sends an engagement letter, chases signatures, creates folders and re-types contact details into three systems."],
      withSystems: [
        "Once the engagement is signed, the client receives an intake form, folders and records are created automatically, and outstanding documents are requested and tracked until received.",
      ],
    },
    solutions: [
      { title: "Client onboarding", description: "Consistent intake, folder setup and document collection.", solution: "administrative-automation" },
      { title: "Document processing", description: "Extract, file and log client documents and invoices.", solution: "document-processing" },
      { title: "Internal knowledge assistant", description: "Sourced answers from your procedures and policies.", solution: "internal-knowledge-systems" },
      { title: "System integrations", description: "Keep CRM, billing and project tools in sync.", solution: "software-api-integrations" },
    ],
    commonTools: ["Microsoft 365 or Google Workspace", "Practice management software", "Accounting software", "CRM"],
    workflows: ["new-client-onboarding", "invoice-document-processing", "internal-policy-assistant", "paid-invoice-crm-sync"],
  },
  {
    slug: "nonprofits",
    name: "Nonprofits & Community Organizations",
    shortName: "Nonprofits",
    icon: "heart",
    preview: { app: "Volunteers", title: "Saturday shift needs 3 more people", body: "Food distribution · 9am–12pm · alert sent", tone: "sun" },
    headline: "Technology for nonprofits and community organizations",
    intro:
      "Nonprofits do a great deal with small teams and volunteers. We help organisations automate volunteer coordination, intake and documentation so staff time goes to the mission.",
    metaTitle: "Automation for Nonprofits & Community Organizations",
    metaDescription:
      "Volunteer scheduling, program intake, document organisation and knowledge systems for nonprofits and community organizations.",
    challenges: [
      { title: "Volunteer coordination", description: "Sign-ups, reminders and coverage tracking happen by email and spreadsheet." },
      { title: "Program intake", description: "Applications and requests arrive in many formats and need follow-up." },
      { title: "Reporting to funders", description: "Gathering program numbers for reports is slow and manual." },
      { title: "Staff turnover", description: "Procedures leave with staff and volunteers." },
    ],
    scenario: {
      title: "Staffing a weekend food distribution",
      today: ["The coordinator emails the volunteer list, tracks replies in a spreadsheet and discovers gaps on Friday."],
      withSystems: [
        "Volunteers sign up through a simple page, receive reminders automatically and the coordinator is alerted 72 hours ahead if any shift is under-staffed.",
      ],
    },
    solutions: [
      { title: "Volunteer scheduling", description: "Sign-ups, reminders and coverage alerts.", solution: "scheduling-appointments" },
      { title: "Program intake", description: "Structured applications with automatic follow-up.", solution: "administrative-automation" },
      { title: "Document organisation", description: "Consistent filing for grants, receipts and records.", solution: "document-processing" },
      { title: "Knowledge base", description: "Procedures available to staff and volunteers.", solution: "internal-knowledge-systems" },
    ],
    commonTools: ["Google Workspace", "Spreadsheets", "Email marketing tools", "Donation platform"],
    workflows: ["volunteer-shift-scheduling", "invoice-document-processing", "internal-policy-assistant"],
  },
];
