import { PageHero, Section } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Astor Systems handles information submitted through this website.",
  path: "/privacy",
});

// NOTE: This is a plain-language starting point, not legal advice. Review with counsel before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy notice" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
      <Section>
        <div className="max-w-2xl space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="text-lg font-semibold text-ink">What we collect</h2>
            <p className="mt-2">
              When you submit a form on this website we collect the information you provide, such as your name, email address,
              phone number, business details and the description of your project, together with basic technical information
              such as your browser type.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">How we use it</h2>
            <p className="mt-2">
              We use this information only to respond to your inquiry, evaluate a potential project and communicate with you
              about it. We do not sell your information or use it for unrelated marketing.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Where it is stored</h2>
            <p className="mt-2">
              Inquiries are stored with reputable service providers that host our systems. Access is limited to the people who
              need it to respond to you.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Your choices</h2>
            <p className="mt-2">
              You can ask us to access, correct or delete the information you have submitted by emailing{" "}
              <a className="text-accent hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
