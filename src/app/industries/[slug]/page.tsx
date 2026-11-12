import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkflowCard } from "@/components/cards";
import { Icon } from "@/components/icons";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { ButtonLink, JsonLd, SectionHeader } from "@/components/ui";
import { NotificationPreview, Toast } from "@/components/illustrations";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/content/photos";
import { getIndustries, getIndustry, getSolution, getWorkflowsBySlugs } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({ title: ind.metaTitle, description: ind.metaDescription, path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const workflows = getWorkflowsBySlugs(ind.workflows);
  const path = `/industries/${ind.slug}`;
  const others = getIndustries().filter((i) => i.slug !== ind.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: ind.metaTitle, description: ind.metaDescription, path }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: ind.shortName, path },
          ]),
        ]}
      />
      <PageHero
        eyebrow={ind.name}
        title={ind.headline}
        intro={ind.intro}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Industries", href: "/industries" }, { name: ind.shortName }]}
        aside={
          <div className="relative hidden lg:block">
            <div className="relative h-80 overflow-hidden rounded-3xl shadow-[var(--shadow-float)]">
              <Photo name={ind.slug as PhotoKey} sizes="(min-width: 1024px) 40vw, 100vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-5">
                <NotificationPreview {...ind.preview} />
              </div>
            </div>
            <Toast className="absolute -left-6 -top-5" icon="check" tone="mint" title="Handled automatically" detail="No extra calls needed" />
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/contact?type=consultation&industry=${ind.slug}`} arrow>
            Request a consultation
          </ButtonLink>
          <ButtonLink href={`/workflows?industry=${ind.slug}`} variant="outline">
            {ind.shortName} workflows
          </ButtonLink>
        </div>
      </PageHero>

      {/* Challenges */}
      <Section>
        <SectionHeader
          eyebrow="Operational challenges"
          title={`Where time and revenue leak in ${ind.shortName.toLowerCase()}.`}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ind.challenges.map((c, i) => (
            <li key={c.title} className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
              <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Scenario */}
      <Section tone="dark">
        <SectionHeader dark eyebrow="A realistic scenario" title={ind.scenario.title} intro="An illustrative example of the same situation, handled two ways." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line-dark bg-navy-900 p-7">
            <p className="eyebrow text-muted-dark">Today</p>
            <ol className="mt-6 space-y-5">
              {ind.scenario.today.map((t, i) => (
                <li key={t} className="flex gap-4 text-sm leading-relaxed text-muted-dark">
                  <span className="font-mono text-xs text-muted-dark/60">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-accent/50 bg-navy-800 p-7">
            <p className="eyebrow text-accent-bright">With connected systems</p>
            <ol className="mt-6 space-y-5">
              {ind.scenario.withSystems.map((t, i) => (
                <li key={t} className="flex gap-4 text-sm leading-relaxed text-white">
                  <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Solutions */}
      <Section>
        <SectionHeader eyebrow="Solutions" title={`How Astor Systems helps ${ind.shortName.toLowerCase()} businesses.`} />
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {ind.solutions.map((sol) => {
            const parent = getSolution(sol.solution);
            return (
              <li key={sol.title} className="grid gap-3 py-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-8">
                <h3 className="font-semibold text-ink">{sol.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{sol.description}</p>
                {parent && (
                  <Link
                    href={`/solutions/${parent.slug}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-accent hover:underline"
                  >
                    {parent.name}
                    <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-10 rounded-2xl border border-line bg-white p-6">
          <p className="eyebrow text-muted">Works alongside tools you may already use</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {ind.commonTools.map((t) => (
              <li key={t} className="rounded-sm border border-line bg-paper px-2.5 py-1 text-sm text-ink/80">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {workflows.length > 0 && (
        <Section tone="white">
          <SectionHeader
            eyebrow="Relevant workflows"
            title={`Workflows for ${ind.shortName.toLowerCase()}.`}
            action={
              <ButtonLink href={`/workflows?industry=${ind.slug}`} variant="ghost" arrow>
                View all
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflows.map((w) => (
              <li key={w.slug}>
                <WorkflowCard workflow={w} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        title={`Let’s look at your ${ind.shortName.toLowerCase()} operation.`}
        primary={{ href: `/contact?type=consultation&industry=${ind.slug}`, label: "Request a consultation" }}
      />

      <section className="border-t border-line bg-paper pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow pt-10 text-muted">Other industries</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="text-sm text-ink/80 hover:text-accent">
                  {o.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
