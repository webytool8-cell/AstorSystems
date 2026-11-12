import { ProjectInquiryForm } from "@/components/forms";
import { PageHero, Section } from "@/components/sections";
import { CheckList } from "@/components/ui";
import { getIndustries, getSolution, getWorkflow } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Custom Projects — Submit a Project Inquiry",
  description:
    "Need a custom automation, integration or business system? Describe your current process and the problems you want to solve, and we will assess the best approach.",
  path: "/custom-projects",
});

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const examples = [
  "Connecting industry software that has no off-the-shelf integration",
  "Replacing a spreadsheet-based process with a proper system",
  "An AI assistant trained on your own procedures and documents",
  "Customer or vendor portals backed by a real database",
  "Consolidating data from several tools into one report",
];

const nextSteps = [
  { title: "Review", body: "We read your inquiry and reply within two business days, including if it is not a fit." },
  { title: "Discovery call", body: "A 30–45 minute call to walk through the current process and constraints." },
  { title: "Proposal", body: "A written scope with deliverables, timeline and fixed price for your approval." },
];

export default async function CustomProjectsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const workflow = getWorkflow(first(sp.workflow) ?? "");
  const solution = getSolution(first(sp.solution) ?? "");
  const context = workflow ? `workflow:${workflow.slug}` : solution ? `solution:${solution.slug}` : undefined;
  const contextLabel = workflow?.name ?? solution?.name;
  const defaultIndustry = workflow && workflow.industries.length === 1 ? workflow.industries[0] : undefined;
  const industries = getIndustries().map((i) => ({ value: i.slug, label: i.name }));

  return (
    <>
      <PageHero
        eyebrow="Custom projects"
        title="Tell us about the problem you want to solve."
        intro="Some operations need more than a standard workflow. Describe how things work today and what you would like to change. The more specific you are, the more useful our response will be."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Custom Projects" }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <aside className="space-y-10 lg:sticky lg:top-24 lg:h-fit">
            {contextLabel && (
              <div className="rounded-lg border border-accent/30 bg-accent-soft p-5">
                <p className="eyebrow text-accent-strong">Regarding</p>
                <p className="mt-2 font-medium text-ink">{contextLabel}</p>
                <p className="mt-1 text-xs text-muted">This will be attached to your inquiry.</p>
              </div>
            )}
            <div>
              <p className="eyebrow text-accent">Typical custom projects</p>
              <div className="mt-5">
                <CheckList items={examples} />
              </div>
            </div>
            <div>
              <p className="eyebrow text-accent">What happens next</p>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink font-mono text-xs">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <ProjectInquiryForm industries={industries} context={context} defaultIndustry={defaultIndustry} />
        </div>
      </Section>
    </>
  );
}
