import Link from "next/link";
import { notFound } from "next/navigation";
import { SolutionCard, WorkflowCard } from "@/components/cards";
import { Icon } from "@/components/icons";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { CheckList, IntegrationMark, JsonLd, SectionHeader, StatusBadge } from "@/components/ui";
import {
  getIntegration,
  getIntegrations,
  getIntegrationsBySlugs,
  getSolutionsBySlugs,
  getWorkflowsForIntegration,
} from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getIntegrations().map((i) => ({ slug: i.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const int = getIntegration(slug);
  if (!int) return {};
  return pageMetadata({
    title: `${int.name} Integration & Automation`,
    description: `${int.summary} How Astor Systems uses ${int.name} in business automation workflows.`,
    path: `/integrations/${int.slug}`,
  });
}

export default async function IntegrationPage({ params }: Props) {
  const { slug } = await params;
  const int = getIntegration(slug);
  if (!int) notFound();

  const connects = getIntegrationsBySlugs(int.connectsTo);
  const solutions = getSolutionsBySlugs(int.solutions);
  const workflows = getWorkflowsForIntegration(int.slug).slice(0, 3);
  const path = `/integrations/${int.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
          { name: int.name, path },
        ])}
      />
      <PageHero
        eyebrow={int.category}
        title={int.name}
        intro={int.summary}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Integrations", href: "/integrations" }, { name: int.name }]}
        aside={
          <div className="flex items-center gap-4 lg:justify-end">
            <IntegrationMark mark={int.mark} size="lg" dark />
            <StatusBadge status={int.status} />
          </div>
        }
      />

      {int.status === "planned" && (
        <div className="border-b border-line bg-white">
          <div className="mx-auto max-w-7xl px-5 py-4 text-sm text-muted sm:px-8">
            <strong className="font-medium text-ink">Planned integration.</strong> {int.name} is on our roadmap but not yet
            part of our tested toolkit. We can scope a project that uses it on request.
          </div>
        </div>
      )}

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="What it does" title={`${int.name} in business operations.`} />
            <p className="mt-6 text-base leading-relaxed text-muted">{int.description}</p>
            <a
              href={int.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Official website <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-lg border border-line bg-white p-7">
            <p className="eyebrow text-accent">Business functions supported</p>
            <div className="mt-5">
              <CheckList items={int.functions} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">Example workflows</p>
            <ul className="mt-6 space-y-4">
              {int.examples.map((ex, i) => (
                <li key={ex} className="flex gap-4 rounded-md border border-line bg-paper p-4 text-sm leading-relaxed text-ink">
                  <span className="font-mono text-xs text-muted-2">{String(i + 1).padStart(2, "0")}</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-accent">Connects with</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {connects.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/integrations/${c.slug}`}
                    className="flex items-center gap-3 rounded-md border border-line bg-white p-3 text-sm text-ink transition-colors hover:border-ink/40"
                  >
                    <IntegrationMark mark={c.mark} size="sm" />
                    <span className="truncate">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {workflows.length > 0 && (
        <Section>
          <SectionHeader eyebrow="In the library" title={`Workflows using ${int.name}.`} />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {workflows.map((w) => (
              <li key={w.slug}>
                <WorkflowCard workflow={w} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="white">
        <SectionHeader eyebrow="Related solutions" title="Where we use it." />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug}>
              <SolutionCard solution={s} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`Connect ${int.name} to the rest of your business.`} />
    </>
  );
}
