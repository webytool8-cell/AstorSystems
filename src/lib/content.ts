/**
 * Content access layer. Pages import from here rather than from the raw data files so
 * the storage backend (static files today; Supabase or an admin dashboard later) can be
 * swapped without touching page components.
 */
import { industries } from "@/content/industries";
import { integrations } from "@/content/integrations";
import { solutions } from "@/content/solutions";
import { workflows } from "@/content/workflows";
import type { Industry, Integration, Solution, Workflow } from "@/content/types";

function bySlug<T extends { slug: string }>(items: T[]) {
  return new Map(items.map((i) => [i.slug, i]));
}
function pick<T>(map: Map<string, T>, slugs: string[]): T[] {
  return slugs.map((s) => map.get(s)).filter((x): x is T => Boolean(x));
}

const solutionMap = bySlug(solutions);
const industryMap = bySlug(industries);
const workflowMap = bySlug(workflows);
const integrationMap = bySlug(integrations);

export const getSolutions = (): Solution[] => solutions;
export const getSolution = (slug: string) => solutionMap.get(slug);
export const getSolutionsBySlugs = (slugs: string[]) => pick(solutionMap, slugs);

export const getIndustries = (): Industry[] => industries;
export const getIndustry = (slug: string) => industryMap.get(slug);
export const getIndustriesBySlugs = (slugs: string[]) => pick(industryMap, slugs);

export const getWorkflows = (): Workflow[] => workflows;
export const getWorkflow = (slug: string) => workflowMap.get(slug);
export const getWorkflowsBySlugs = (slugs: string[]) => pick(workflowMap, slugs);
export const getFeaturedWorkflows = () => workflows.filter((w) => w.featured);

export const getIntegrations = (): Integration[] => integrations;
export const getIntegration = (slug: string) => integrationMap.get(slug);
export const getIntegrationsBySlugs = (slugs: string[]) => pick(integrationMap, slugs);

export const getWorkflowsForIntegration = (slug: string) => workflows.filter((w) => w.integrations.includes(slug));
export const getWorkflowsForIndustry = (slug: string) => workflows.filter((w) => w.industries.includes(slug));
export const getWorkflowsForSolution = (slug: string) => workflows.filter((w) => w.category === slug);

export const platformLabels = { n8n: "n8n", make: "Make", zapier: "Zapier" } as const;

export function accessLabel(w: Workflow): string {
  switch (w.access.status) {
    case "implementation":
      return "Available with implementation";
    case "coming-soon":
      return "Template coming soon";
    case "free":
      return "Free template";
    case "paid":
      return `$${w.access.priceUsd}`;
  }
}
