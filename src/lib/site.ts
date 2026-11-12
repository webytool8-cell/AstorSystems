/**
 * Global site configuration. Values marked PLACEHOLDER must be replaced before launch.
 */
export const site = {
  name: "Astor Systems",
  tagline: "Business Technology & Automation",
  description:
    "Astor Systems helps businesses streamline operations, connect their technology, and eliminate repetitive work through intelligent automation and custom integrations.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.astorsystems.com").replace(/\/$/, ""),
  /** PLACEHOLDER: replace with the real business inbox once configured. */
  email: "hello@astorsystems.com",
};

export const mainNav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/workflows", label: "Workflows" },
  { href: "/integrations", label: "Integrations" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;
