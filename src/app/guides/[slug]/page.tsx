import Link from "next/link";
import { notFound } from "next/navigation";
import { SolutionCard, WorkflowCard } from "@/components/cards";
import { Icon } from "@/components/icons";
import { Photo } from "@/components/photo";
import { CtaBand, Section } from "@/components/sections";
import { Breadcrumbs, ButtonLink, Container, Eyebrow, JsonLd } from "@/components/ui";
import { demos } from "@/content/demos";
import { getGuide, getGuides } from "@/content/guides";
import { photos } from "@/content/photos";
import { getSolutionsBySlugs, getWorkflowsBySlugs } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return { ...pageMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}` }), openGraph: { type: "article", title: g.title, description: g.description, publishedTime: g.published } };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const workflows = getWorkflowsBySlugs(g.related.workflows);
  const solutions = getSolutionsBySlugs(g.related.solutions);
  const demo = demos.find((d) => d.slug === g.related.demo);
  const date = new Date(`${g.published}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
            datePublished: g.published,
            image: `${site.url}${photos[g.photo].src}`,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}${path}`,
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: g.title, path },
          ]),
        ]}
      />
      <article>
        <header className="border-b border-line bg-paper">
          <Container className="py-14 sm:py-16">
            <div className="mx-auto max-w-3xl">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }, { name: g.category }]} />
            <div className="mt-8">
              <Eyebrow>{g.category}</Eyebrow>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">{g.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{g.description}</p>
            <p className="mt-6 text-sm text-muted">
              <time dateTime={g.published}>{date}</time> · {g.readingMinutes} min read · {site.name}
            </p>
            </div>
          </Container>
          <Container>
            <div className="mx-auto h-64 max-w-4xl overflow-hidden rounded-3xl sm:h-96">
              <Photo name={g.photo} sizes="(min-width: 1024px) 900px, 100vw" priority />
            </div>
          </Container>
        </header>

        <Container className="py-14">
          <div className="mx-auto max-w-3xl">
          <div className="space-y-5 text-[17px] leading-[1.75] text-ink/90">
            {g.body.map((b, i) => {
              switch (b.type) {
                case "p":
                  return <p key={i}>{b.text}</p>;
                case "h2":
                  return (
                    <h2 key={i} className="!mt-12 text-2xl font-semibold text-ink">
                      {b.text}
                    </h2>
                  );
                case "list": {
                  const Tag = b.ordered ? "ol" : "ul";
                  return (
                    <Tag key={i} className={b.ordered ? "list-decimal space-y-2 pl-6" : "space-y-2"}>
                      {b.items.map((it) =>
                        b.ordered ? (
                          <li key={it}>{it}</li>
                        ) : (
                          <li key={it} className="flex gap-3">
                            <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-mint" strokeWidth={2.5} />
                            {it}
                          </li>
                        ),
                      )}
                    </Tag>
                  );
                }
                case "tip":
                  return (
                    <aside key={i} className="!my-8 rounded-2xl border border-accent/20 bg-accent-soft p-5">
                      <p className="text-sm font-semibold text-accent-strong">{b.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink">{b.text}</p>
                    </aside>
                  );
              }
            })}
          </div>

          {demo && (
            <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">Interactive demo</p>
                <p className="mt-1 font-semibold text-ink">{demo.title}</p>
                <p className="mt-1 text-sm text-muted">{demo.summary}</p>
              </div>
              <ButtonLink href={`/demos/${demo.slug}`} arrow className="shrink-0">
                Try it
              </ButtonLink>
            </div>
          )}
          </div>
        </Container>
      </article>

      <Section tone="white">
        <h2 className="text-2xl font-semibold text-ink">Related workflows</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {workflows.map((w) => (
            <li key={w.slug}>
              <WorkflowCard workflow={w} />
            </li>
          ))}
        </ul>
        <h2 className="mt-16 text-2xl font-semibold text-ink">Related solutions</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {solutions.map((s, i) => (
            <li key={s.slug}>
              <SolutionCard solution={s} index={i} />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm">
          <Link href="/guides" className="font-semibold text-accent hover:underline">
            ← All guides
          </Link>
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
