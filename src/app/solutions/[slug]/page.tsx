import Link from "next/link";
import { notFound } from "next/navigation";
import { IndustryCard, IntegrationCard, WorkflowCard } from "@/components/cards";
import { Icon } from "@/components/icons";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { ButtonLink, CheckList, JsonLd, SectionHeader } from "@/components/ui";
import { StepLegend, WorkflowDiagram } from "@/components/workflow-diagram";
import { getIndustriesBySlugs, getIntegrationsBySlugs, getSolution, getSolutions, getWorkflowsBySlugs } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSolutions().map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const integrations = getIntegrationsBySlugs(s.integrations);
  const industries = getIndustriesBySlugs(s.industries);
  const workflows = getWorkflowsBySlugs(s.workflows);
  const path = `/solutions/${s.slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: s.name, description: s.metaDescription, path }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: s.name, path },
          ]),
        ]}
      />
      <PageHero
        eyebrow={s.name}
        title={s.headline}
        intro={s.tagline}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: s.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/custom-projects?solution=${s.slug}`} arrow>
            Request implementation
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="outline-light">
            See how it works
          </ButtonLink>
        </div>
      </PageHero>

      {/* Problem + description */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="The problem" title={s.problem.summary} />
            <ul className="mt-8 space-y-4">
              {s.problem.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Icon name="minus" className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={2} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white p-7 sm:p-9">
            <p className="eyebrow text-accent">The solution</p>
            <div className="prose-astor mt-5 text-base leading-relaxed text-ink">
              {s.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-5 border-t border-line pt-8 sm:grid-cols-2">
              {s.capabilities.map((c) => (
                <li key={c.title}>
                  <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section tone="white" id="how-it-works">
        <SectionHeader
          eyebrow="How the workflow operates"
          title="A typical flow, from first contact to recorded outcome."
          intro="Every implementation is adapted to your tools and rules. This is the common pattern."
        />
        <div className="mt-8">
          <StepLegend />
        </div>
        <div className="mt-8">
          <WorkflowDiagram steps={s.steps} />
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeader eyebrow="Business benefits" title="What changes for your business." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {s.benefits.map((b) => (
            <li key={b.title} className="bg-white p-6">
              <h3 className="font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Requirements + integrations */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeader eyebrow="Requirements" title="What you will need." />
            <div className="mt-8">
              <CheckList items={s.requirements} />
            </div>
          </div>
          <div>
            <p className="eyebrow text-accent">Software &amp; integrations</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {integrations.map((int) => (
                <li key={int.slug}>
                  <IntegrationCard integration={int} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Implementation options */}
      <Section>
        <SectionHeader eyebrow="Implementation options" title="Choose the level of involvement that suits you." />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {s.implementation.map((opt, i) => (
            <li key={opt.title} className="flex flex-col rounded-lg border border-line bg-white p-7">
              <span className="font-mono text-xs text-muted-2">Option {String.fromCharCode(65 + i)}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{opt.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{opt.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href={`/custom-projects?solution=${s.slug}`} arrow>
            Request implementation
          </ButtonLink>
        </div>
      </Section>

      {workflows.length > 0 && (
        <Section tone="white">
          <SectionHeader
            eyebrow="Related workflows"
            title="Workflows in this category."
            action={
              <ButtonLink href={`/workflows?category=${s.slug}`} variant="ghost" arrow>
                View in library
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((w) => (
              <li key={w.slug}>
                <WorkflowCard workflow={w} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <SectionHeader eyebrow="Common in" title="Industries where this solution fits." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <IndustryCard industry={ind} />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">
          Looking for something else?{" "}
          <Link href="/solutions" className="font-medium text-accent hover:underline">
            Browse all solutions
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title={`Discuss ${s.name.toLowerCase()} for your business.`}
        primary={{ href: `/custom-projects?solution=${s.slug}`, label: "Request implementation" }}
        secondary={{ href: "/contact?type=consultation", label: "Book a consultation" }}
      />
    </>
  );
}
