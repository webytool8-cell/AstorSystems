import Link from "next/link";
import { notFound } from "next/navigation";
import { IntegrationCard, WorkflowCard } from "@/components/cards";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { ButtonLink, CheckList, JsonLd, SectionHeader, Tag } from "@/components/ui";
import { StepLegend, WorkflowDiagram } from "@/components/workflow-diagram";
import {
  accessLabel,
  getIndustriesBySlugs,
  getIntegrationsBySlugs,
  getSolution,
  getWorkflow,
  getWorkflows,
  platformLabels,
} from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWorkflows().map((w) => ({ slug: w.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const w = getWorkflow(slug);
  if (!w) return {};
  return pageMetadata({ title: `${w.name} Workflow`, description: `${w.summary} ${w.problem}`.slice(0, 300), path: `/workflows/${w.slug}` });
}

export default async function WorkflowPage({ params }: Props) {
  const { slug } = await params;
  const w = getWorkflow(slug);
  if (!w) notFound();

  const industries = getIndustriesBySlugs(w.industries);
  const integrations = getIntegrationsBySlugs(w.integrations);
  const category = getSolution(w.category);
  const related = getWorkflows()
    .filter((o) => o.slug !== w.slug && (o.category === w.category || o.industries.some((i) => w.industries.includes(i))))
    .slice(0, 3);
  const path = `/workflows/${w.slug}`;

  const facts: [string, React.ReactNode][] = [
    [
      "Industry",
      industries.map((i, idx) => (
        <span key={i.slug}>
          {idx > 0 && ", "}
          <Link href={`/industries/${i.slug}`} className="hover:text-accent hover:underline">
            {i.shortName}
          </Link>
        </span>
      )),
    ],
    [
      "Category",
      category ? (
        <Link href={`/solutions/${category.slug}`} className="hover:text-accent hover:underline">
          {category.name}
        </Link>
      ) : (
        "—"
      ),
    ],
    ["Business function", w.function],
    ["Platforms", w.platforms.map((p) => platformLabels[p]).join(", ")],
    ["Difficulty", w.difficulty],
    ["Typical setup", w.setupEstimate],
    ["Access", accessLabel(w)],
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Workflows", path: "/workflows" },
          { name: w.name, path },
        ])}
      />
      <PageHero
        eyebrow="Workflow"
        title={w.name}
        intro={w.summary}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Workflows", href: "/workflows" }, { name: w.name }]}
      >
        <div className="flex flex-wrap gap-2">
          <Tag tone="accent">{w.function}</Tag>
          <Tag tone="accent">{w.difficulty}</Tag>
          {w.platforms.map((p) => (
            <Tag tone="accent" key={p}>
              {platformLabels[p]}
            </Tag>
          ))}
        </div>
      </PageHero>

      <Section tone="white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Workflow preview" title="How it runs." />
          <StepLegend />
        </div>
        <div className="mt-10">
          <WorkflowDiagram steps={w.steps} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow text-amber">Problem solved</p>
            <p className="mt-4 text-2xl font-semibold leading-snug text-ink">{w.problem}</p>
            <div className="prose-astor mt-8 text-base leading-relaxed text-muted">
              {w.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <p className="eyebrow text-accent">Outcomes</p>
              <div className="mt-5">
                <CheckList items={w.outcomes} />
              </div>
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-line bg-white">
            <dl className="divide-y divide-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 px-5 py-3.5 text-sm">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-line p-5">
              {w.access.status === "implementation" && w.access.note && (
                <p className="mb-3 text-xs text-muted">{w.access.note}</p>
              )}
              <ButtonLink href={`/custom-projects?workflow=${w.slug}`} arrow className="w-full">
                Request this workflow
              </ButtonLink>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {w.access.status === "coming-soon"
                  ? "A self-install template is in preparation. In the meantime we can implement and configure it for you."
                  : "Implemented and configured for your accounts, rules and wording."}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="Required integrations" title="Tools this workflow connects." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((int) => (
            <li key={int.slug}>
              <IntegrationCard integration={int} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          Equivalent tools can often be substituted, for example Microsoft 365 in place of Google Workspace.
        </p>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Related" title="Related workflows." />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <WorkflowCard workflow={r} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        title="Want this running in your business?"
        primary={{ href: `/custom-projects?workflow=${w.slug}`, label: "Request this workflow" }}
        secondary={{ href: "/workflows", label: "Back to the library" }}
      />
    </>
  );
}
