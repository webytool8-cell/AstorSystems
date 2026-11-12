import { IntegrationCard } from "@/components/cards";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { StatusBadge } from "@/components/ui";
import type { IntegrationCategory } from "@/content/types";
import { getIntegrations } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integrations Directory",
  description:
    "Platforms Astor Systems works with: n8n, Make, Zapier, OpenAI, Anthropic, Twilio, Google Workspace, Microsoft 365, Airtable, HubSpot, Calendly, Stripe and Supabase.",
  path: "/integrations",
});

const order: IntegrationCategory[] = [
  "Automation Platforms",
  "AI Models",
  "Communication",
  "Productivity Suites",
  "Data & Databases",
  "CRM & Sales",
  "Scheduling",
  "Payments",
];

export default function IntegrationsPage() {
  const all = getIntegrations();
  const groups = order.map((cat) => ({ cat, items: all.filter((i) => i.category === cat) })).filter((g) => g.items.length);
  const supported = all.filter((i) => i.status === "supported").length;

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="The platforms we connect."
        intro="We build on established platforms so your systems are reliable, maintainable and not dependent on us. Each page explains what the platform does, what it connects to and how it is used."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Integrations" }]}
      />
      <Section>
        <div className="flex flex-col gap-6 rounded-lg border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-semibold text-ink">How to read integration status</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              <strong className="font-medium text-ink">Supported</strong> means we have built and tested implementations with
              the platform. <strong className="font-medium text-ink">Planned</strong> means it is on our roadmap and can be
              scoped on request, but is not yet part of our tested toolkit.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <StatusBadge status="supported" /> {supported}
            <StatusBadge status="planned" /> {all.length - supported}
          </div>
        </div>

        <div className="mt-14 space-y-14">
          {groups.map((g) => (
            <section key={g.cat} aria-labelledby={`cat-${g.cat}`}>
              <h2 id={`cat-${g.cat}`} className="eyebrow text-muted">
                {g.cat}
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((int) => (
                  <li key={int.slug}>
                    <IntegrationCard integration={int} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Using a platform that is not listed?"
        body="Most business software offers an API or webhooks. Tell us what you use and we will assess whether and how it can be connected."
        primary={{ href: "/contact?type=general", label: "Ask about an integration" }}
      />
    </>
  );
}
