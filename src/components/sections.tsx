import { ButtonLink, Breadcrumbs, Container, Eyebrow, cx } from "./ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumbs?: { name: string; href?: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {breadcrumbs && (
          <div className="mb-10">
            <Breadcrumbs items={breadcrumbs} dark />
          </div>
        )}
        <div className={cx("grid gap-12", Boolean(aside) && "lg:grid-cols-[1.3fr_1fr] lg:items-end")}>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">{intro}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Start with the problem, not the technology.",
  body = "Book a free 30-minute consultation. We will walk through how work moves through your business today and identify where automation would make a measurable difference — and where it would not.",
  primary = { href: "/contact?type=consultation", label: "Request a consultation" },
  secondary = { href: "/custom-projects", label: "Describe a custom project" },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Eyebrow dark>Consultation</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-dark">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href={primary.href} arrow>
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="outline-light">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "white" | "dark";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cx(
        "py-20 sm:py-24",
        tone === "paper" && "bg-paper",
        tone === "white" && "border-y border-line bg-white",
        tone === "dark" && "bg-navy-950 text-white",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
