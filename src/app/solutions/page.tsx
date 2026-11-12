import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { getSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business Automation Solutions",
  description:
    "Business automation solutions organised by problem: customer communication, lead management, scheduling, admin automation, document processing, reporting, knowledge systems, AI assistants and integrations.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const solutions = getSolutions();
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solutions organised around the problems you actually have."
        intro="Start with the part of your operation that causes the most friction. Each solution describes the problem, how the system works, and what it takes to implement."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Solutions" }]}
      />
      <Section>
        <ul className="divide-y divide-line border-y border-line">
          {solutions.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group grid gap-4 py-8 transition-colors sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 hover:bg-white/60"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white text-ink">
                    <Icon name={s.icon} />
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink group-hover:text-accent">{s.name}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{s.tagline}</p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    {s.capabilities.map((c) => (
                      <span key={c.title} className="font-mono">
                        {c.title}
                      </span>
                    ))}
                  </p>
                </div>
                <Icon name="arrow-right" className="hidden h-5 w-5 text-muted-2 transition-transform group-hover:translate-x-1 group-hover:text-accent sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Not sure where to start?" body="Tell us what slows your team down. We will recommend the one or two changes likely to make the biggest difference first." />
    </>
  );
}
