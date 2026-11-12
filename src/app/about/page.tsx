import { CtaBand, PageHero, Section } from "@/components/sections";
import { SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Astor Systems",
  description:
    "Astor Systems is a business technology and integration company helping small and mid-sized businesses modernise operations through practical automation.",
  path: "/about",
});

const focus = [
  { title: "Practical problem-solving", body: "We start from a specific operational problem and measure success by whether it goes away." },
  { title: "Business-focused technology", body: "We choose tools for reliability, cost and maintainability, not novelty." },
  { title: "Intelligent automation", body: "Rules where rules work, AI where judgement on language or documents helps, and people where it matters." },
  { title: "Custom integrations", body: "Connecting the software you already depend on so information flows without re-entry." },
  { title: "Operational efficiency", body: "Fewer hand-offs, fewer dropped tasks, and more time for the work customers pay for." },
  { title: "Long-term support", body: "Systems need care. We offer ongoing monitoring and improvement so they keep working." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A business systems and technology integration company."
        intro="Astor Systems helps small and mid-sized businesses replace manual processes and disconnected software with practical, well-built systems."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow="Why we exist" title="Most small businesses do not need more software. They need their software to work together." />
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              Many traditional businesses — property managers, repair shops, trades, cleaning companies, professional firms —
              still run on phone calls, inboxes, spreadsheets and memory. Each tool they use is fine on its own, but people end
              up doing the work of connecting them: re-typing details, chasing updates and remembering to follow up.
            </p>
            <p>
              Astor Systems exists to close those gaps. We look at how work actually moves through a business, identify where
              time and customers are being lost, and build systems that fix it using established platforms for automation,
              communication, data and AI.
            </p>
            <p>
              We are deliberately not an &ldquo;AI agency.&rdquo; Artificial intelligence is a useful part of what we build, but
              it is one component of a broader approach to business systems. Sometimes the right answer is a well-designed form
              and a clear notification rule.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <SectionHeader eyebrow="What we focus on" title="Our approach." />
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {focus.map((f) => (
            <li key={f.title} className="border-t border-ink pt-5">
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow="Where we are going" title="From implementation partner to platform." />
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              Today, our work is custom implementation for individual businesses. Over time we are building a library of
              proven, documented workflows, and a platform where businesses can discover, implement and manage their automation
              in one place.
            </p>
            <p>
              Every workflow in our library starts the same way: as a solution to a real problem for a real business. That
              principle — build technology around real business problems, not technology for its own sake — guides everything
              we do.
            </p>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
