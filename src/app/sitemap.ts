import type { MetadataRoute } from "next";
import { getIndustries, getIntegrations, getSolutions, getWorkflows } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    entry("/solutions", 0.9),
    entry("/industries", 0.9),
    entry("/workflows", 0.8),
    entry("/integrations", 0.7),
    entry("/services", 0.8),
    entry("/custom-projects", 0.8),
    entry("/about", 0.5),
    entry("/contact", 0.7),
    entry("/privacy", 0.2),
    ...getSolutions().map((s) => entry(`/solutions/${s.slug}`, 0.8)),
    ...getIndustries().map((i) => entry(`/industries/${i.slug}`, 0.8)),
    ...getWorkflows().map((w) => entry(`/workflows/${w.slug}`, 0.6)),
    ...getIntegrations().map((i) => entry(`/integrations/${i.slug}`, 0.5)),
  ];
}
