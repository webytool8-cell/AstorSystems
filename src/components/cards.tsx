import Link from "next/link";
import type { Industry, Integration, Solution, Workflow } from "@/content/types";
import { accessLabel, platformLabels } from "@/lib/content";
import { Icon } from "./icons";
import { IntegrationMark, StatusBadge, Tag, cx } from "./ui";
import { WorkflowMini } from "./workflow-diagram";

export function SolutionCard({ solution, index }: { solution: Solution; index?: number }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-ink/40"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-paper text-ink">
          <Icon name={solution.icon} />
        </span>
        {index !== undefined && <span className="font-mono text-xs text-muted-2">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-ink">{solution.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{solution.tagline}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-accent">
        View solution
        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function IndustryCard({ industry, dark = false }: { industry: Industry; dark?: boolean }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className={cx(
        "group flex h-full flex-col justify-between gap-6 rounded-lg border p-6 transition-colors",
        dark ? "border-line-dark bg-navy-900 hover:border-accent-bright/60" : "border-line bg-white hover:border-ink/40",
      )}
    >
      <div>
        <Icon name={industry.icon} className={cx("h-6 w-6", dark ? "text-accent-bright" : "text-accent")} />
        <h3 className={cx("mt-5 text-lg font-semibold", dark ? "text-white" : "text-ink")}>{industry.shortName}</h3>
        <p className={cx("mt-2 text-sm leading-relaxed", dark ? "text-muted-dark" : "text-muted")}>
          {industry.challenges
            .slice(0, 3)
            .map((c) => c.title)
            .join(" · ")}
        </p>
      </div>
      <span className={cx("inline-flex items-center gap-1.5 text-sm font-medium", dark ? "text-white" : "text-ink", "group-hover:text-accent-bright")}>
        Explore
        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function WorkflowCard({ workflow, industryNames }: { workflow: Workflow; industryNames?: string[] }) {
  return (
    <Link
      href={`/workflows/${workflow.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-ink/40"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{workflow.function}</Tag>
        <Tag>{workflow.difficulty}</Tag>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{workflow.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{workflow.summary}</p>
      <div className="mt-6">
        <WorkflowMini steps={workflow.steps} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-xs">
        <span className="font-mono text-muted">{workflow.platforms.map((p) => platformLabels[p]).join(" · ")}</span>
        <span className={cx("font-medium", workflow.access.status === "implementation" ? "text-accent-strong" : "text-muted")}>
          {accessLabel(workflow)}
        </span>
      </div>
      {industryNames && industryNames.length > 0 && <p className="sr-only">Industries: {industryNames.join(", ")}</p>}
    </Link>
  );
}

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Link
      href={`/integrations/${integration.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-ink/40"
    >
      <div className="flex items-start justify-between gap-3">
        <IntegrationMark mark={integration.mark} />
        <StatusBadge status={integration.status} />
      </div>
      <h3 className="mt-4 font-semibold text-ink">{integration.name}</h3>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-2">{integration.category}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{integration.summary}</p>
    </Link>
  );
}
