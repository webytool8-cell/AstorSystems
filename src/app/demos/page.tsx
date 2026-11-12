import Link from "next/link";
import { Icon } from "@/components/icons";
import { Photo } from "@/components/photo";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { demos } from "@/content/demos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Interactive Demos",
  description:
    "Try interactive prototypes of an AI receptionist, a cleaning company quote-to-booking system and a property maintenance request workflow.",
  path: "/demos",
});

export default function DemosPage() {
  return (
    <>
      <PageHero
        eyebrow="Demos"
        title="Try it yourself."
        intro="These interactive prototypes show the kinds of systems we build. They run in your browser on sample data — nothing is sent anywhere — so click around as much as you like."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Demos" }]}
      />
      <Section>
        <ul className="grid gap-6 lg:grid-cols-3">
          {demos.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/demos/${d.slug}`}
                className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <Photo name={d.photo} className="transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">{d.industryName}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-sun-soft px-3 py-1 text-xs font-semibold text-sun">Prototype</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="text-xl font-semibold text-ink">{d.shortTitle}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{d.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Try the demo
                    <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
          Demos are illustrations, not client projects. Business names, people and figures are made up. A real implementation is
          built around your own process, wording, pricing and tools.
        </p>
      </Section>
      <CtaBand title="Want one of these for your business?" body="Every demo is based on a real workflow pattern from our library. We adapt it to your process, tools and wording." />
    </>
  );
}
