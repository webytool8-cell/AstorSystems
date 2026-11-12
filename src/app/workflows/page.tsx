import { Suspense } from "react";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { StepLegend } from "@/components/workflow-diagram";
import { WorkflowLibrary } from "@/components/workflow-library";
import { getIndustries, getSolutions, getWorkflows } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Automation Workflow Library",
  description:
    "Browse automation workflows for service businesses by industry, business function and platform (n8n, Make, Zapier): lead follow-up, appointment reminders, maintenance intake and more.",
  path: "/workflows",
});

export default function WorkflowsPage() {
  const workflows = getWorkflows();
  const industries = getIndustries().map((i) => ({ value: i.slug, label: i.shortName }));
  const categories = getSolutions().map((s) => ({ value: s.slug, label: s.name }));

  return (
    <>
      <PageHero
        eyebrow="Workflow library"
        title="Automation workflows for real business processes."
        intro="Each workflow describes a proven automation pattern: the problem it solves, how it runs, the platforms it supports and what it needs. Workflows are currently delivered as part of an implementation; downloadable templates are on the way."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Workflows" }]}
      />
      <Section>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">Diagram key</p>
          <StepLegend />
        </div>
        <Suspense fallback={<div className="h-40 rounded-2xl border border-line bg-white" />}>
          <WorkflowLibrary workflows={workflows} industries={industries} categories={categories} />
        </Suspense>
      </Section>
      <CtaBand
        title="Need a workflow that is not listed?"
        body="Most implementations are adapted or built to order. Describe the process and we will design the workflow around it."
        primary={{ href: "/custom-projects", label: "Describe your process" }}
        secondary={{ href: "/contact?type=workflow", label: "Ask about a workflow" }}
      />
    </>
  );
}
