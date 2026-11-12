import Link from "next/link";
import { IndustryCard, ServiceCard, SolutionCard, WorkflowCard, tint } from "@/components/cards";
import { Icon } from "@/components/icons";
import { DashboardMockup, PhoneMockup, Toast } from "@/components/illustrations";
import { CtaBand, Section } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, IntegrationMark, JsonLd, SectionHeader, cx } from "@/components/ui";
import type { IconName } from "@/content/types";
import { getFeaturedWorkflows, getIndustries, getIntegrations, getSolutions } from "@/lib/content";

const services = [
  {
    href: "/services#integration",
    label: "Done for you",
    title: "Custom implementation",
    body: "We map how your business runs today, then build and test a system that fits it — in your accounts, with your wording.",
    points: ["AI receptionists & call handling", "Lead capture and follow-up", "CRM setup and software integrations"],
    cta: "Plan a project",
    photo: "service-implementation" as const,
    image: <Toast icon="check" tone="accent" title="New inquiry → booked visit" detail="Built around your process" />,
  },
  {
    href: "/workflows",
    label: "Ready to go",
    title: "Proven workflow templates",
    body: "Start from workflows we have already designed for common problems, configured for your tools and rules.",
    points: ["Appointment reminders", "Quote and estimate follow-ups", "Invoice and document processing"],
    cta: "Browse workflows",
    photo: "service-templates" as const,
    image: <Toast icon="inbox" tone="violet" title="Ready-made workflows" detail="Reminders, follow-ups, intake…" />,
  },
  {
    href: "/services#managed",
    label: "Peace of mind",
    title: "Ongoing support",
    body: "We monitor and maintain your automations so they keep working as your apps and your business change.",
    points: ["Monitoring and alerts", "Fixes and API updates", "Improvements as you grow"],
    cta: "About managed services",
    photo: "service-support" as const,
    image: <Toast icon="chart" tone="mint" title="All systems healthy" detail="Monitoring & alerts included" />,
  },
];

const problems: { icon: IconName; problem: string; outcome: string }[] = [
  { icon: "phone", problem: "“We miss calls while we’re on a job.”", outcome: "Every caller gets a reply in seconds, with their details sent to you." },
  { icon: "funnel", problem: "“Quotes go out and we never follow up.”", outcome: "Polite follow-ups go out on schedule until there’s an answer." },
  { icon: "calendar", problem: "“Booking takes five texts and people still no-show.”", outcome: "Customers book themselves and get reminders they can reply to." },
  { icon: "inbox", problem: "“We type the same details into three places.”", outcome: "Enter it once — it shows up everywhere it’s needed." },
  { icon: "document", problem: "“Invoices and paperwork pile up in the inbox.”", outcome: "Documents are read, filed and logged for you to approve." },
  { icon: "chart", problem: "“I don’t really know how the week went.”", outcome: "A short summary of leads, jobs and revenue every morning." },
];

const steps = [
  { title: "Free consultation", body: "A relaxed 30-minute call about how your business runs and what slows you down." },
  { title: "Clear proposal", body: "A plain-English plan with a fixed price. No jargon, no surprises." },
  { title: "We build & test", body: "Set up in your accounts and tested with real scenarios before anything goes live." },
  { title: "Launch & support", body: "We train your team, hand over documentation, and stay on call if you want us." },
];

const principles: { icon: IconName; title: string; body: string }[] = [
  { icon: "wrench", title: "Problem first", body: "We start with what’s costing you time or customers. If automation isn’t the answer, we’ll tell you." },
  { icon: "plug", title: "Works with your tools", body: "We connect the software you already use instead of asking you to start over." },
  { icon: "briefcase", title: "You own it", body: "Everything is built in your accounts and documented, so it’s never a black box." },
  { icon: "assistant", title: "Sensible AI", body: "AI handles specific, reviewable tasks — with a person involved wherever it matters." },
  { icon: "document", title: "Fixed, honest pricing", body: "You know exactly what you’re getting and what it costs before we start." },
  { icon: "heart", title: "Here for the long run", body: "Optional ongoing support keeps your systems healthy as your business grows." },
];

const faqs = [
  {
    q: "Do I need to replace the software I already use?",
    a: "Usually not. Most of our work connects the tools you already have — your phone system, email, calendar, spreadsheets or CRM — so they work together.",
  },
  {
    q: "We’re a small team and not very technical. Is this for us?",
    a: "Yes. We design systems around the people who will use them, explain everything in plain language and provide simple documentation and training.",
  },
  {
    q: "Will an AI be talking to my customers?",
    a: "Only if you want it to, and only within limits you approve. Assistants identify themselves as automated and hand off to a person for anything outside their scope.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope. Smaller automations can start under $2,000; larger connected systems cost more. Every proposal has a fixed price agreed before work begins.",
  },
  {
    q: "How long does it take?",
    a: "Simple workflows can be live within days. Larger implementations typically take two to four weeks, including testing with your team.",
  },
  {
    q: "What happens if something breaks?",
    a: "Every build includes error alerts and documentation. With managed support, we monitor your automations and fix issues — often before you notice them.",
  },
];

export default function HomePage() {
  const solutions = getSolutions();
  const industries = getIndustries();
  const featured = getFeaturedWorkflows().slice(0, 3);
  const integrations = getIntegrations();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[620px] w-[620px] rounded-full bg-accent-soft blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-sun-soft blur-3xl" aria-hidden="true" />
        <Container className="relative grid gap-16 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:pb-28 lg:pt-24">
          <div className="animate-rise">
            <Eyebrow>Technology &amp; automation for small businesses</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
              Better Systems.
              <br />
              <span className="text-accent">Smarter Operations.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Astor Systems helps businesses streamline operations, connect their technology, and eliminate repetitive work
              through intelligent automation and custom integrations.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/solutions" arrow>
                Explore solutions
              </ButtonLink>
              <ButtonLink href="/contact?type=consultation" variant="outline">
                Request a free consultation
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {["Free 30-minute consultation", "Fixed-price proposals", "You own everything we build"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint-soft text-mint">
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Product illustration */}
          <figure className="relative mx-auto w-full max-w-[580px] sm:pb-16" aria-label="Illustration of an Astor Systems setup in use">
            <DashboardMockup className="w-full sm:w-[78%]" />
            <PhoneMockup
              className="absolute -right-2 top-14 hidden animate-float sm:block"
              business="Rivera Heating & Air"
              messages={[
                { from: "customer", text: "Hi, our AC stopped working. Can someone come today?" },
                { from: "business", text: "Thanks Maria! A technician can be there 2–4pm today. Reply YES to confirm." },
                { from: "customer", text: "YES" },
                { from: "business", text: "Booked ✓ We’ll text when Jake is on the way." },
              ]}
            />
            <Toast className="absolute bottom-0 left-10 hidden sm:flex" icon="calendar" tone="accent" title="Added to calendar" detail="Today · 2:00–4:00 PM" />
            <Toast className="absolute -left-6 top-40 hidden sm:flex" icon="check" tone="mint" title="Lead saved to CRM" detail="Source: text message" />
            <figcaption className="sr-only">Sample business, names and figures are illustrative.</figcaption>
          </figure>
        </Container>
      </section>

      {/* Services */}
      <Section tone="white" id="services">
        <SectionHeader
          align="center"
          eyebrow="What we do"
          title="Three ways we can help"
          intro="Whether you need something built from scratch, a proven workflow set up quickly, or someone to keep it all running, we’ve got you covered."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title}>
              <ServiceCard {...s} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Problems */}
      <Section>
        <SectionHeader
          eyebrow="Sound familiar?"
          title="The small, everyday problems that quietly cost you customers."
          intro="None of these are dramatic on their own. Together, they add up to hours every week and work that slips through the cracks."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <li key={p.problem} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
              <span className={cx("flex h-11 w-11 items-center justify-center rounded-xl", tint(i))}>
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <p className="mt-5 text-lg font-semibold leading-snug text-ink">{p.problem}</p>
              <p className="mt-auto flex gap-2.5 border-t border-line pt-4 text-sm leading-relaxed text-muted [&]:mt-5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-soft text-mint">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                {p.outcome}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section tone="white">
        <SectionHeader align="center" eyebrow="How it works" title="Simple from first call to launch" intro="No long contracts or confusing retainers — just a clear plan and a working result." />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-line bg-paper p-6">
              <span className={cx("flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold", tint(i))}>{i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              {i < steps.length - 1 && (
                <Icon name="arrow-right" className="absolute -right-4 top-9 z-10 hidden h-6 w-6 rounded-full bg-white p-1 text-muted-2 shadow-[var(--shadow-card)] lg:block" />
              )}
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <ButtonLink href="/contact?type=consultation" arrow>
            Book your free consultation
          </ButtonLink>
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHeader
          eyebrow="Who we help"
          title="Built for businesses that run on phones, schedules and paperwork."
          intro="Each industry has its own way of working. Here’s a taste of what that looks like once the right systems are in place."
          action={
            <ButtonLink href="/industries" variant="outline" arrow>
              All industries
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <IndustryCard industry={ind} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Solutions */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Solutions"
          title="Pick the problem you want to fix."
          intro="Each solution works on its own, or combine several into one connected system."
          action={
            <ButtonLink href="/solutions" variant="outline" arrow>
              All solutions
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <li key={s.slug}>
              <SolutionCard solution={s} index={i} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Workflows */}
      <Section>
        <SectionHeader
          eyebrow="Workflow library"
          title="See exactly how it works."
          intro="Every workflow shows each step, the tools involved and what it takes to set up."
          action={
            <ButtonLink href="/workflows" variant="outline" arrow>
              Browse the library
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((w) => (
            <li key={w.slug}>
              <WorkflowCard workflow={w} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Integrations */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Integrations"
              title="Works with the tools you already use."
              intro="We connect proven platforms rather than asking you to replace them. We only mark an integration as supported once we’ve built and tested it."
            />
            <div className="mt-8">
              <ButtonLink href="/integrations" variant="outline" arrow>
                See all integrations
              </ButtonLink>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {integrations.map((int) => (
              <li key={int.slug}>
                <Link
                  href={`/integrations/${int.slug}`}
                  className="card-hover flex h-full flex-col items-center gap-2 rounded-2xl border border-line bg-white px-2 py-4 text-center"
                >
                  <IntegrationMark mark={int.mark} size="sm" />
                  <span className="text-xs font-medium text-ink">{int.name}</span>
                  <span className={cx("rounded-full px-2 py-0.5 text-[10px] font-medium", int.status === "supported" ? "bg-mint-soft text-mint" : "bg-paper text-muted")}>
                    {int.status === "supported" ? "Supported" : "Planned"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <SectionHeader
          align="center"
          eyebrow="Why Astor Systems"
          title="A systems partner, not another AI agency"
          intro="AI is one useful tool among many. Our job is to make your business run better, using whatever does that most reliably."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
              <span className={cx("flex h-11 w-11 items-center justify-center rounded-xl", tint(i + 2))}>
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeader eyebrow="Questions" title="Things people usually ask" intro="Don’t see your question? Just ask — we’re happy to help." />
            <div className="mt-8">
              <ButtonLink href="/contact?type=general" variant="outline" arrow>
                Ask a question
              </ButtonLink>
            </div>
          </div>
          <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-[var(--shadow-card)] transition-transform group-open:rotate-45">
                    <Icon name="close" className="h-3.5 w-3.5 rotate-45" strokeWidth={2.25} />
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Let’s find the busywork you can stop doing."
        body="Book a free, no-pressure 30-minute call. We’ll look at how your business runs today and point out two or three things that would make the biggest difference — whether or not you work with us."
      />
    </>
  );
}
