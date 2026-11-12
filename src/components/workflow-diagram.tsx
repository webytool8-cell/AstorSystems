import type { StepKind, WorkflowStep } from "@/content/types";
import { cx } from "./ui";

export const stepKindMeta: Record<StepKind, { label: string; dot: string; short: string }> = {
  trigger: { label: "Starts when", dot: "bg-accent", short: "TR" },
  ai: { label: "AI helps", dot: "bg-violet", short: "AI" },
  condition: { label: "Checks", dot: "bg-amber", short: "IF" },
  action: { label: "Does", dot: "bg-ink", short: "AC" },
  record: { label: "Saves", dot: "bg-muted-2", short: "DB" },
  notify: { label: "Lets you know", dot: "bg-accent-bright", short: "NT" },
};

/**
 * Full workflow diagram. Horizontal flow on large screens, vertical on small screens.
 * Rendered from data so every solution and workflow page shares one visual language.
 */
export function WorkflowDiagram({ steps, dark = false, showDetails = true }: { steps: WorkflowStep[]; dark?: boolean; showDetails?: boolean }) {
  return (
    <div>
      <ol
        className={cx(
          "grid gap-3 lg:gap-0",
          steps.length <= 4 ? "lg:grid-cols-4" : steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6",
        )}
        aria-label="Workflow steps"
      >
        {steps.map((step, i) => {
          const meta = stepKindMeta[step.kind];
          const last = i === steps.length - 1;
          return (
            <li key={`${step.label}-${i}`} className="relative flex lg:flex-col lg:pr-6">
              {/* connector */}
              {!last && (
                <>
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute left-5 top-full h-3 w-px lg:hidden",
                      dark ? "bg-line-dark" : "bg-line-strong",
                    )}
                  />
                  <span aria-hidden="true" className="absolute right-0 top-9 hidden w-6 items-center lg:flex">
                    <svg viewBox="0 0 24 8" className="h-2 w-6 overflow-visible" fill="none">
                      <path
                        d="M0 4 H20"
                        className={cx(dark ? "stroke-accent-bright/60" : "stroke-line-strong", "animate-dash")}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <path d="M18 1 L22 4 L18 7" className={dark ? "stroke-accent-bright/80" : "stroke-muted-2"} strokeWidth="1.5" />
                    </svg>
                  </span>
                </>
              )}
              <div
                className={cx(
                  "flex w-full flex-col rounded-xl border p-4",
                  dark ? "border-line-dark bg-navy-900/80" : "border-line bg-white",
                  step.kind === "condition" && (dark ? "border-amber/40" : "border-amber/40"),
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={cx("flex items-center gap-2 text-[11px] font-medium", dark ? "text-muted-dark" : "text-muted")}>
                    <span className={cx("h-2 w-2 rounded-[2px]", meta.dot)} aria-hidden="true" />
                    {meta.label}
                  </span>
                  <span className={cx("font-mono text-[10px]", dark ? "text-muted-dark/70" : "text-muted-2")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className={cx("mt-3 text-sm font-medium leading-snug", dark ? "text-white" : "text-ink")}>{step.label}</p>
                {step.tool && <p className={cx("mt-1 text-xs", dark ? "text-muted-dark" : "text-muted")}>{step.tool}</p>}
              </div>
            </li>
          );
        })}
      </ol>
      {showDetails && steps.some((s) => s.detail) && (
        <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div key={`${step.label}-d-${i}`} className="flex gap-3">
              <dt className={cx("font-mono text-xs pt-0.5", dark ? "text-accent-bright" : "text-accent")}>{String(i + 1).padStart(2, "0")}</dt>
              <dd className={cx("text-sm leading-relaxed", dark ? "text-muted-dark" : "text-muted")}>
                <span className={cx("font-medium", dark ? "text-white" : "text-ink")}>{/[?.!]$/.test(step.label) ? step.label : `${step.label}.`}{" "}</span>
                {step.detail}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/** Compact preview used on workflow cards. */
export function WorkflowMini({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="flex items-center" aria-label={`Workflow with ${steps.length} steps: ${steps.map((s) => s.label).join(", ")}`} role="img">
      {steps.map((step, i) => {
        const meta = stepKindMeta[step.kind];
        return (
          <div key={`${step.label}-${i}`} className="flex flex-1 items-center last:flex-none">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] border border-line bg-white font-mono text-[9px] text-muted"
              title={`${meta.label}: ${step.label}`}
            >
              <span className={cx("h-1.5 w-1.5 rounded-[1px]", meta.dot)} />
            </span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-line-strong" />}
          </div>
        );
      })}
    </div>
  );
}

export function StepLegend({ dark = false }: { dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {Object.entries(stepKindMeta).map(([kind, meta]) => (
        <li key={kind} className={cx("flex items-center gap-2 text-xs font-medium", dark ? "text-muted-dark" : "text-muted")}>
          <span className={cx("h-2 w-2 rounded-[2px]", meta.dot)} aria-hidden="true" />
          {meta.label}
        </li>
      ))}
    </ul>
  );
}
