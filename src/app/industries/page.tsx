import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { getIndustries } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "Automation and technology solutions for property management, auto repair, plumbing and HVAC, cleaning companies, contractors, moving companies, salons, professional services and nonprofits.",
  path: "/industries",
});

export default function IndustriesPage() {
  const industries = getIndustries();
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Solutions designed around how your industry actually works."
        intro="A cleaning company and a property manager both need better intake, but the details are completely different. Our industry pages describe real operational challenges and the systems that address them."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Industries" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-7 transition-colors hover:border-ink/40"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-paper text-accent">
                    <Icon name={ind.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="text-xl font-semibold text-ink group-hover:text-accent">{ind.name}</h2>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">{ind.intro}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ind.solutions.map((sol) => (
                    <li key={sol.title} className="rounded-sm bg-paper px-2 py-1 text-xs text-ink/80">
                      {sol.title}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-ink group-hover:text-accent">
                  View {ind.shortName.toLowerCase()} solutions
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Your industry is not listed?" body="The underlying problems — intake, follow-up, scheduling, paperwork — are common to most service businesses. Tell us how your business works and we will tell you honestly whether we can help." />
    </>
  );
}
