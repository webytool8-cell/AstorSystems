import Link from "next/link";
import { IndustryCard, SolutionCard, WorkflowCard } from "@/components/cards";
import { Icon } from "@/components/icons";
import { CtaBand, Section } from "@/components/sections";
import { SystemGraphic } from "@/components/system-graphic";
import { ButtonLink, Container, Eyebrow, IntegrationMark, SectionHeader } from "@/components/ui";
import { getFeaturedWorkflows, getIndustries, getIntegrations, getSolutions } from "@/lib/content";

const problems = [
  {
    problem: "Calls and messages go unanswered while your team is busy.",
    outcome: "Every inquiry is acknowledged in seconds and routed with full details.",
  },
  {
    problem: "Leads and estimates are tracked in inboxes, notebooks and memory.",
    outcome: "One pipeline with automatic follow-up until there is a decision.",
  },
  {
    problem: "Scheduling takes several calls and no-shows leave gaps.",
    outcome: "Self-service booking with reminders customers can reply to.",
  },
  {
    problem: "The same information is typed into three different systems.",
    outcome: "Data is entered once and flows wherever it is needed.",
  },
  {
    problem: "Invoices and documents are read, renamed and filed by hand.",
    outcome: "Documents are extracted, filed and logged automatically.",
  },
  {
    problem: "Nobody has a clear view of how the business is performing.",
    outcome: "Key numbers arrive in a short report every morning.",
  },
];

const process = [
  {
    title: "Discover",
    body: "A focused review of how work moves through your business today: where time goes, what gets missed and which tools are involved.",
  },
  {
    title: "Design",
    body: "A written proposal describing the system, the tools, what it will and will not do, and a fixed scope and price.",
  },
  {
    title: "Build & test",
    body: "We build in your accounts, test with real scenarios, and refine wording and rules with your team before launch.",
  },
  {
    title: "Launch & support",
    body: "Documentation, training and a handover. Optional managed service keeps everything monitored and improving.",
  },
];

const principles = [
  { title: "Problem first", body: "We start from the operational problem and its cost. If automation is not the right answer, we say so." },
  { title: "Proven platforms", body: "We build on established tools such as n8n, Make, Twilio and leading AI models rather than fragile one-off code." },
  { title: "You own it", body: "Systems are built in your accounts, with your data, and documented so they are never a black box." },
  { title: "AI where it helps", body: "AI is used for specific, reviewable tasks with clear boundaries and a person in the loop where it matters." },
  { title: "Fixed, honest scope", body: "Clear proposals with defined deliverables, so you know what you are getting before work starts." },
  { title: "Built to last", body: "Monitoring, error handling and documentation are part of every build, not optional extras." },
];

export default function HomePage() {
  const solutions = getSolutions();
  const industries = getIndustries();
  const featured = getFeaturedWorkflows().slice(0, 3);
  const integrations = getIntegrations();

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_75%)]" aria-hidden="true" />
        <Container className="relative grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-28">
          <div>
            <Eyebrow dark>Business technology &amp; automation</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Better Systems.
              <br />
              <span className="text-muted-dark">Smarter Operations.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark">
              Astor Systems helps businesses streamline operations, connect their technology, and eliminate repetitive work
              through intelligent automation and custom integrations.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/solutions" arrow>
                Explore solutions
              </ButtonLink>
              <ButtonLink href="/contact?type=consultation" variant="outline-light">
                Request a consultation
              </ButtonLink>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line-dark pt-6">
              {[
                ["Integration", "Connect your tools"],
                ["Automation", "Remove manual work"],
                ["Support", "Keep it running"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-accent-bright">{k}</dt>
                  <dd className="mt-1 text-sm text-muted-dark">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SystemGraphic />
        </Container>
      </section>

      {/* 2. Problems */}
      <Section>
        <SectionHeader
          eyebrow="Problems we solve"
          title="The everyday friction that quietly costs you customers and hours."
          intro="Most operational problems are not dramatic. They are small, repeated delays and hand-offs that add up every single week."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <li key={p.problem} className="flex flex-col bg-white p-6 sm:p-7">
              <span className="font-mono text-xs text-muted-2">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-base font-medium leading-snug text-ink">{p.problem}</p>
              <p className="mt-auto flex gap-2 pt-6 text-sm leading-relaxed text-muted">
                <Icon name="arrow-right" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {p.outcome}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Solutions */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Technology solutions"
          title="Solutions organised around business problems."
          intro="Each solution can be implemented on its own or combined into a connected system."
          action={
            <ButtonLink href="/solutions" variant="ghost" arrow>
              All solutions
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <li key={s.slug}>
              <SolutionCard solution={s} index={i} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Industries */}
      <Section tone="dark">
        <SectionHeader
          dark
          eyebrow="Industries served"
          title="Built for businesses that run on phones, schedules and paperwork."
          intro="We focus on industries where administrative work creates measurable cost, and design solutions around how each one actually operates."
          action={
            <ButtonLink href="/industries" variant="outline-light" arrow>
              All industries
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <IndustryCard industry={ind} dark />
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. How it works */}
      <Section>
        <SectionHeader
          eyebrow="How it works"
          title="A clear, four-step engagement."
          intro="No long contracts or vague retainers. Every project has a defined scope, a working result and documentation you keep."
        />
        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {process.map((step, i) => (
            <li key={step.title} className="relative lg:pr-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink font-mono text-xs text-ink">
                  {i + 1}
                </span>
                {i < process.length - 1 && <span className="hidden h-px flex-1 bg-line-strong lg:block" aria-hidden="true" />}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <ButtonLink href="/services" variant="ghost" arrow>
            Services &amp; engagement options
          </ButtonLink>
        </div>
      </Section>

      {/* 6. Featured workflows */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Workflow library"
          title="Proven workflows, ready to configure."
          intro="Browse automation patterns by industry, business function and platform. Each can be implemented and adapted to your business."
          action={
            <ButtonLink href="/workflows" variant="ghost" arrow>
              Browse the library
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {featured.map((w) => (
            <li key={w.slug}>
              <WorkflowCard workflow={w} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Integrations */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeader
            eyebrow="Integrations"
            title="Works with the tools you already use."
            intro="We connect established platforms rather than asking you to replace them. Integrations are marked as supported only once we have built and tested them."
            action={undefined}
          />
          <div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {integrations.map((int) => (
                <li key={int.slug}>
                  <Link
                    href={`/integrations/${int.slug}`}
                    className="flex h-full flex-col items-center gap-2 rounded-md border border-line bg-white px-2 py-4 text-center transition-colors hover:border-ink/40"
                  >
                    <IntegrationMark mark={int.mark} size="sm" />
                    <span className="text-xs font-medium text-ink">{int.name}</span>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider ${int.status === "supported" ? "text-emerald-700" : "text-muted-2"}`}
                    >
                      {int.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/integrations" variant="ghost" arrow>
                Integrations directory
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Why Astor */}
      <Section tone="white">
        <SectionHeader
          eyebrow="Why Astor Systems"
          title="A systems partner, not another AI agency."
          intro="AI is one tool among many. Our job is to make your operation run better, using whatever combination of technology does that most reliably."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-ink pt-5">
              <h3 className="font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 9. CTA */}
      <CtaBand />
    </>
  );
}
