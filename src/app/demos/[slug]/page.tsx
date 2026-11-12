import Link from "next/link";
import { notFound } from "next/navigation";
import { CleaningDemo } from "@/components/demos/cleaning-demo";
import { MaintenanceDemo } from "@/components/demos/maintenance-demo";
import { ReceptionistDemo } from "@/components/demos/receptionist-demo";
import { Icon } from "@/components/icons";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { ButtonLink, CheckList, JsonLd } from "@/components/ui";
import { demos } from "@/content/demos";
import { getIndustry, getSolution, getWorkflow } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const components: Record<string, () => React.ReactNode> = {
  "ai-receptionist": () => <ReceptionistDemo />,
  "cleaning-quotes-crm": () => <CleaningDemo />,
  "maintenance-requests": () => <MaintenanceDemo />,
};

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const d = demos.find((x) => x.slug === slug);
  if (!d) return {};
  return pageMetadata({ title: `${d.title} — Interactive Demo`, description: d.summary, path: `/demos/${d.slug}` });
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const d = demos.find((x) => x.slug === slug);
  if (!d) notFound();
  const workflow = getWorkflow(d.workflow);
  const solution = getSolution(d.solution);
  const industry = getIndustry(d.industry);
  const path = `/demos/${d.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Demos", path: "/demos" },
          { name: d.shortTitle, path },
        ])}
      />
      <PageHero
        eyebrow={`Interactive demo · ${d.industryName}`}
        title={d.title}
        intro={d.intro}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Demos", href: "/demos" }, { name: d.shortTitle }]}
      />
      <Section className="!pt-12">
        {components[d.slug]()}
        <p className="mt-4 text-center text-xs text-muted">
          Prototype for illustration only. Runs entirely in your browser with sample data; no calls, texts or records are created.
        </p>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold text-ink">What this demo shows</h2>
            <div className="mt-5">
              <CheckList items={d.shows} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink">In a real build</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              A production version connects to your real phone line, forms, calendar and records. It typically uses:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink">Learn more</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {workflow && (
                <li>
                  <Link href={`/workflows/${workflow.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                    Workflow: {workflow.name} <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </li>
              )}
              {solution && (
                <li>
                  <Link href={`/solutions/${solution.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                    Solution: {solution.name} <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </li>
              )}
              {industry && (
                <li>
                  <Link href={`/industries/${industry.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                    Industry: {industry.shortName} <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </li>
              )}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/demos" variant="outline">
                All demos
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Want this working in your business?"
        primary={{ href: `/custom-projects?workflow=${d.workflow}`, label: "Request this system" }}
        secondary={{ href: "/contact?type=consultation", label: "Book a consultation" }}
      />
    </>
  );
}
