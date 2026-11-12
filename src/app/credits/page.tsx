import { PageHero, Section } from "@/components/sections";
import { Photo } from "@/components/photo";
import { photos, type PhotoKey } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Image Credits",
  description: "Credits and licenses for photography used on the Astor Systems website.",
  path: "/credits",
});

export default function CreditsPage() {
  const entries = Object.entries(photos) as [PhotoKey, (typeof photos)[PhotoKey]][];
  return (
    <>
      <PageHero
        eyebrow="Credits"
        title="Image credits"
        intro="Photography on this site is openly licensed and used under the terms below. Photos show general scenes from each industry; the people pictured are not Astor Systems clients or staff."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Credits" }]}
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(([key, p]) => (
            <li key={key} className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
              <div className="h-40">
                <Photo name={key} sizes="(min-width: 1024px) 33vw, 100vw" />
              </div>
              <div className="p-5 text-sm leading-relaxed">
                <p className="font-semibold text-ink">&ldquo;{p.title}&rdquo;</p>
                <p className="mt-1 text-muted">
                  by{" "}
                  {p.creatorUrl ? (
                    <a href={p.creatorUrl} className="text-accent hover:underline" rel="noopener noreferrer" target="_blank">
                      {p.creator}
                    </a>
                  ) : (
                    p.creator
                  )}
                </p>
                <p className="mt-1 text-muted">
                  {p.licenseUrl ? (
                    <a href={p.licenseUrl} className="hover:underline" rel="noopener noreferrer license" target="_blank">
                      {p.license}
                    </a>
                  ) : (
                    p.license
                  )}{" "}
                  ·{" "}
                  <a href={p.sourceUrl} className="hover:underline" rel="noopener noreferrer" target="_blank">
                    Source
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-muted">
          Images were resized and cropped for display. Interface illustrations on this site were created by Astor Systems
          and show sample data only.
        </p>
      </Section>
    </>
  );
}
