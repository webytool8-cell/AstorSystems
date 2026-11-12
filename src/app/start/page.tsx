import { IntakeChat } from "@/components/intake/intake-chat";
import { Container, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a Free Systems Proposal",
  description:
    "Describe your business to our AI assistant and get a preliminary proposal of the automations and integrations that could help, reviewed by the Astor Systems team.",
  path: "/start",
});

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function StartPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const initialMessage = q?.trim().slice(0, 2000) || undefined;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent-soft blur-3xl" aria-hidden="true" />
      <Container className="relative py-10 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <Eyebrow>Free · about 3 minutes</Eyebrow>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">Tell us about your business. We&rsquo;ll suggest the systems.</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Chat with our assistant about what&rsquo;s slowing you down. It&rsquo;ll draft a proposal of the automations and integrations
            that fit — which you can send to our team for review.
          </p>
        </div>
        <IntakeChat initialMessage={initialMessage} />
      </Container>
    </section>
  );
}
