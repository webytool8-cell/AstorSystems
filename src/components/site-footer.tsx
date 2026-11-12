import Link from "next/link";
import { getIndustries, getSolutions } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { Container } from "./ui";

export function SiteFooter() {
  const solutions = getSolutions();
  const industries = getIndustries();
  const columns = [
    { title: "Solutions", links: solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name })) },
    { title: "Industries", links: industries.map((i) => ({ href: `/industries/${i.slug}`, label: i.shortName })) },
    {
      title: "Company",
      links: [
        { href: "/services", label: "Services" },
        { href: "/workflows", label: "Workflow Library" },
        { href: "/integrations", label: "Integrations" },
        { href: "/about", label: "About" },
        { href: "/custom-projects", label: "Custom Projects" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-5 text-sm leading-relaxed text-muted-dark">
              Business technology and automation for small and mid-sized businesses. Practical systems built around real
              operational problems.
            </p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block font-mono text-sm text-white hover:text-accent-bright">
              {site.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow text-muted-dark">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/80 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-line-dark pt-8 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/credits" className="hover:text-white">
              Image credits
            </Link>
            <span>Third-party product names are trademarks of their respective owners.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
