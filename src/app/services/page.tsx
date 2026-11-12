import { CtaBand, PageHero, Section } from "@/components/sections";
import { ButtonLink, CheckList, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services: Integration, Workflow Templates & Managed Automation",
  description:
    "Technology integration services, workflow templates and managed automation services for small and mid-sized businesses.",
  path: "/services",
});

const services = [
  {
    id: "integration",
    label: "01",
    title: "Technology integration services",
    intro:
      "Custom implementation of automation, AI and integrations, scoped around your actual requirements rather than a predetermined package.",
    items: [
      "AI receptionist implementation",
      "Automated appointment scheduling",
      "Customer inquiry management",
      "Lead capture and follow-up automation",
      "CRM implementation and integrations",
      "Document processing and organisation",
      "Internal workflow automation",
      "AI-powered business assistants",
      "Custom API integrations",
      "Business reporting and data management",
    ],
    cta: { href: "/custom-projects", label: "Submit a project" },
  },
  {
    id: "templates",
    label: "02",
    title: "Workflow templates",
    intro:
      "A growing library of ready-made workflows for n8n, Make and Zapier, each with documentation covering purpose, requirements, configuration and implementation.",
    items: [
      "Customer inquiry automation",
      "Appointment reminders",
      "Lead management workflows",
      "Automated quote requests",
      "Invoice and document processing",
      "Customer follow-up systems",
      "Internal notification systems",
    ],
    note: "Templates are currently delivered as part of an implementation. Self-install downloads are in preparation.",
    cta: { href: "/workflows", label: "Browse the library" },
  },
  {
    id: "managed",
    label: "03",
    title: "Managed automation services",
    intro:
      "Ongoing technical support for the systems we implement, so integrations keep working as your apps, APIs and business change.",
    items: [
      "Workflow monitoring and alerting",
      "Integration maintenance and API updates",
      "Troubleshooting and incident response",
      "Automation improvements and optimisation",
      "Additional workflow implementation",
      "Technical support for your team",
    ],
    cta: { href: "/contact?type=managed", label: "Ask about managed services" },
  },
];

const engagement = [
  { title: "Fixed-scope projects", body: "Defined deliverables and a fixed price agreed before work begins." },
  { title: "Built in your accounts", body: "You own the tools, data and workflows. Nothing is locked to us." },
  { title: "Documentation included", body: "Every implementation includes a written guide to what was built and how it works." },
  { title: "Optional ongoing support", body: "Managed service is a choice, not a requirement, and can be cancelled." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Implementation, templates and ongoing support."
        intro="Astor Systems works in three ways: we implement custom systems, provide proven workflow templates, and manage automations over the long term."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
      />
      {services.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 ? "white" : "paper"}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="font-mono text-sm text-accent">{s.label}</span>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{s.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{s.intro}</p>
              {s.note && <p className="mt-4 rounded-md border border-line bg-paper px-4 py-3 text-sm text-muted">{s.note}</p>}
              <div className="mt-8">
                <ButtonLink href={s.cta.href} variant="secondary" arrow>
                  {s.cta.label}
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-white p-7 sm:p-8">
              <CheckList items={s.items} />
            </div>
          </div>
        </Section>
      ))}
      <Section tone="dark">
        <SectionHeader dark eyebrow="How we engage" title="Clear terms from the start." />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {engagement.map((e) => (
            <li key={e.title} className="border-t border-line-dark pt-5">
              <h3 className="font-semibold text-white">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-dark">{e.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
