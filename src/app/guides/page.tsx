import Link from "next/link";
import { Icon } from "@/components/icons";
import { Photo } from "@/components/photo";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { getGuides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Automation Guides for Small Businesses",
  description: "Practical, plain-English guides to business automation: missed calls, maintenance requests, lead follow-up and where to start.",
  path: "/guides",
});

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Practical guides, in plain English."
        intro="Step-by-step advice for improving how your business runs — whether or not you work with us."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides" }]}
      />
      <Section>
        <ul className="grid gap-6 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
                <div className="h-48 overflow-hidden">
                  <Photo name={g.photo} className="transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[13px] font-semibold text-accent">
                    {g.category} · {g.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-ink">{g.title}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{g.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read the guide <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Rather talk it through?" body="Book a free 30-minute consultation and we’ll help you find the two or three changes that would make the biggest difference." />
    </>
  );
}
