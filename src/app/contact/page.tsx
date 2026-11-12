import Link from "next/link";
import { ContactForm } from "@/components/forms";
import { Icon } from "@/components/icons";
import { PageHero, Section } from "@/components/sections";
import { getIndustry } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact & Consultations",
  description: "Request a free consultation or get in touch with Astor Systems about automation, integrations and managed services.",
  path: "/contact",
});

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const consultation = [
  "A 30-minute call, free of charge and without obligation",
  "We discuss how work flows through your business today",
  "You leave with two or three concrete opportunities, whether or not you work with us",
];

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const industry = getIndustry(first(sp.industry) ?? "");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about how your business runs."
        intro="Request a consultation, ask about a workflow or send a general question. We reply to every inquiry within two business days."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <aside className="space-y-10">
            <div>
              <p className="eyebrow text-accent">The consultation</p>
              <ul className="mt-5 space-y-3">
                {consultation.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="eyebrow text-muted">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-2 font-mono text-sm text-ink hover:text-accent">
                <Icon name="mail" className="h-4 w-4" />
                {site.email}
              </a>
              <p className="mt-5 eyebrow text-muted">Response time</p>
              <p className="mt-2 text-sm text-ink">Within two business days</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-semibold text-ink">Have a defined project?</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Use the project inquiry form to share your current tools, problems, budget and timeline in one go.
              </p>
              <Link href="/custom-projects" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                Submit a custom project <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </aside>
          <ContactForm defaultTopic={first(sp.type)} context={industry ? `industry:${industry.slug}` : undefined} />
        </div>
      </Section>
    </>
  );
}
