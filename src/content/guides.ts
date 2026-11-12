import type { PhotoKey } from "./photos";

/** Educational guides. Body content is structured so it can later move to MDX or a CMS. */
export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "tip"; title: string; text: string };

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  readingMinutes: number;
  photo: PhotoKey;
  body: GuideBlock[];
  related: { workflows: string[]; solutions: string[]; demo?: string };
}

export const guides: Guide[] = [
  {
    slug: "stop-losing-leads-from-missed-calls",
    title: "How to stop losing leads from missed calls",
    description:
      "A practical playbook for service businesses: how to measure missed calls and make sure every caller gets a response.",
    category: "Customer communication",
    published: "2026-11-12",
    readingMinutes: 6,
    photo: "plumbing-hvac",
    related: { workflows: ["missed-call-text-back", "ai-call-intake-qualification"], solutions: ["customer-communication", "ai-assistants"], demo: "ai-receptionist" },
    body: [
      { type: "p", text: "If you run a service business, your phone is probably your most important sales channel — and the one you can least control. You can’t answer while you’re under a sink, on a ladder or with a customer at the counter. Most people who reach voicemail don’t leave a message. They call the next business on the list." },
      { type: "p", text: "The good news is that this is one of the easiest problems to fix with automation, and you don’t need to replace your phone system to do it." },
      { type: "h2", text: "Step 1: Find out how many calls you’re actually missing" },
      { type: "p", text: "Before changing anything, look at your phone provider’s call log for the last two to four weeks. Count unanswered calls during business hours and after hours separately, and note how many of those numbers never called back." },
      { type: "tip", title: "Quick check", text: "If your provider doesn’t show missed calls clearly, ask them — most business phone services can export a call log. That one report usually makes the case on its own." },
      { type: "h2", text: "Step 2: Reply to every missed call within seconds" },
      { type: "p", text: "The simplest fix is a missed-call text-back. When a call goes unanswered, the caller automatically receives a short text from your business number:" },
      { type: "list", items: ["Acknowledge the missed call and apologise briefly", "Ask what they need, or offer a link to book or request a quote", "Tell them when to expect a call back"] },
      { type: "p", text: "Replies are forwarded to your team with the caller’s details, so the callback starts with context instead of “Sorry, who is this?”" },
      { type: "h2", text: "Step 3: Capture the details you need to act" },
      { type: "p", text: "A text-back starts the conversation; structured intake finishes it. Whether through a short form linked in the text or a conversation with an AI assistant, collect the essentials: name, address, the service needed, urgency and preferred timing." },
      { type: "h2", text: "Step 4: Decide when a person must step in" },
      { type: "p", text: "Automation should never get in the way of an emergency. Define clear rules — for example, “no heat with a vulnerable occupant” or “active water leak” — that immediately alert or transfer to whoever is on call." },
      { type: "h2", text: "Should you use an AI receptionist?" },
      { type: "p", text: "An AI receptionist answers the call itself, collects details, qualifies the caller and books or routes the job. It suits businesses with high call volume, lots of after-hours calls or no dedicated front desk. For many small businesses, a missed-call text-back is the right first step, with an AI receptionist added later if call volume justifies it." },
      { type: "list", items: ["Make sure it identifies itself as automated", "Limit it to approved information and clear tasks", "Give it a reliable way to hand off to a person", "Review transcripts regularly in the first few weeks"] },
      { type: "h2", text: "What to measure" },
      { type: "p", text: "Track missed calls, how many received a text-back, how many replied and how many became booked jobs. Within a few weeks you’ll know whether the change is paying for itself." },
    ],
  },
  {
    slug: "automating-maintenance-requests",
    title: "A practical guide to automating maintenance requests",
    description:
      "How property managers can capture complete maintenance requests, escalate emergencies and keep tenants informed without constant phone calls.",
    category: "Property management",
    published: "2026-11-12",
    readingMinutes: 7,
    photo: "property-management",
    related: { workflows: ["maintenance-request-intake", "vendor-dispatch-coordination", "tenant-status-updates"], solutions: ["administrative-automation"], demo: "maintenance-requests" },
    body: [
      { type: "p", text: "Maintenance is where tenant satisfaction is won or lost — and where property managers lose the most time to back-and-forth. Requests arrive by phone, text and email, often missing the unit number, photos or permission to enter. Urgent issues sit in the same inbox as routine ones." },
      { type: "h2", text: "1. Standardise intake" },
      { type: "p", text: "Give tenants one simple way to report an issue — a short form or a dedicated text number — that always collects:" },
      { type: "list", items: ["Unit and contact details", "A description in the tenant’s own words", "Photos where helpful", "Whether it is getting worse (for example, actively leaking)", "Permission to enter and access notes"] },
      { type: "tip", title: "Keep it short", text: "Every extra question reduces completion. Ask only what you need to triage and dispatch; the vendor can gather the rest." },
      { type: "h2", text: "2. Classify by trade and urgency" },
      { type: "p", text: "Each request should be tagged with a trade (plumbing, electrical, heating and cooling, appliance, general) and an urgency level. An AI model can read free-form descriptions reliably, while simple rules act as guardrails — for example, anything mentioning gas, sparks, flooding or no heat in winter is always an emergency." },
      { type: "h2", text: "3. Escalate emergencies immediately" },
      { type: "p", text: "Emergencies should trigger an immediate call and text to the on-call contact, with all details attached. Routine requests can wait for normal business hours." },
      { type: "h2", text: "4. Assign and schedule vendors" },
      { type: "p", text: "Once approved, the work order can be offered to a preferred vendor by trade and property. The vendor accepts and proposes a time; the tracker updates automatically." },
      { type: "h2", text: "5. Keep tenants informed automatically" },
      { type: "p", text: "Most “just checking” calls disappear when tenants receive short updates at each stage: received, assigned, scheduled and completed. On completion, ask the tenant to confirm the issue is resolved — and reopen the request automatically if it isn’t." },
      { type: "h2", text: "6. Keep a complete record" },
      { type: "p", text: "Every request, message, photo, invoice and status change should live on the work order. That history makes owner reporting, budgeting and disputes far easier." },
      { type: "h2", text: "Where to start" },
      { type: "p", text: "Start with intake and tenant updates — they deliver the quickest relief. Add vendor dispatch and invoice processing once the basics are working smoothly." },
    ],
  },
  {
    slug: "where-to-start-with-business-automation",
    title: "Where to start with business automation: a checklist for small businesses",
    description:
      "A simple way to find the automation opportunities that will actually make a difference, and avoid the ones that won’t.",
    category: "Getting started",
    published: "2026-11-12",
    readingMinutes: 5,
    photo: "service-templates",
    related: { workflows: ["daily-operations-digest", "new-client-onboarding", "estimate-follow-up-sequence"], solutions: ["administrative-automation", "lead-management"] },
    body: [
      { type: "p", text: "Automation is not about replacing people or buying the latest AI tool. It’s about removing the repetitive steps that slow your team down and cause things to slip through the cracks. The hard part is knowing where to start." },
      { type: "h2", text: "Step 1: List your repetitive tasks for one week" },
      { type: "p", text: "Ask everyone on the team to jot down tasks they do more than a few times a week that follow the same pattern. Common examples:" },
      { type: "list", items: ["Replying to new inquiries with the same information", "Copying customer details between systems", "Sending appointment reminders", "Following up on quotes and invoices", "Filing documents and attachments", "Compiling numbers for a weekly report"] },
      { type: "h2", text: "Step 2: Score each task" },
      { type: "p", text: "For each task, ask three questions:" },
      { type: "list", ordered: true, items: ["How often does it happen, and how long does it take?", "What does it cost when it’s forgotten or done late — a lost lead, an unhappy customer, a late payment?", "Does it follow clear rules, or does it need judgement every time?"] },
      { type: "tip", title: "Rule of thumb", text: "The best first projects are frequent, rule-based and costly when missed. Tasks that need careful judgement every time are better left to people, with automation supporting them." },
      { type: "h2", text: "Step 3: Check what your current tools can already do" },
      { type: "p", text: "Many businesses already pay for software with automation features they’ve never switched on. Your scheduling app may already send reminders; your CRM may already support follow-up tasks. Start there before adding anything new." },
      { type: "h2", text: "Step 4: Start small and measure" },
      { type: "p", text: "Pick one workflow, define what success looks like (for example, “every quote gets two follow-ups”), and run it for a month. Measure the result, then move to the next one." },
      { type: "h2", text: "Step 5: Make sure someone owns it" },
      { type: "p", text: "Every automation needs an owner who gets alerted when something fails and reviews it occasionally. Unmonitored automations break quietly when apps change." },
      { type: "h2", text: "Common mistakes to avoid" },
      { type: "list", items: ["Automating a broken process instead of fixing it first", "Buying tools before defining the problem", "Letting AI talk to customers without clear limits and a hand-off to a person", "Building something nobody on the team understands or can maintain"] },
    ],
  },
];

export const getGuides = () => guides;
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
