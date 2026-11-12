import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-paper py-28">
      <Container className="max-w-2xl text-center">
        <p className="eyebrow text-accent">404 · Not found</p>
        <h1 className="mt-5 text-4xl font-semibold text-ink">This page is not part of the system.</h1>
        <p className="mt-4 text-muted">The page you were looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="secondary">
            Go to homepage
          </ButtonLink>
          <ButtonLink href="/solutions" variant="ghost" arrow>
            Explore solutions
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
