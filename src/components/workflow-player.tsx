"use client";

import { useEffect, useState } from "react";
import type { WorkflowStep } from "@/content/types";
import { Icon } from "./icons";
import { WorkflowDiagram, stepKindMeta } from "./workflow-diagram";

/**
 * Interactive workflow visualisation: steps through a workflow one node at a time,
 * explaining what happens at each stage. Falls back to the static diagram before play.
 */
export function WorkflowPlayer({ steps, showDetails = true }: { steps: WorkflowStep[]; showDetails?: boolean }) {
  const [active, setActive] = useState<number | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const finished = active !== undefined && active >= steps.length;

  useEffect(() => {
    if (!playing) return;
    if (active !== undefined && active >= steps.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setActive((a) => (a === undefined ? 0 : a + 1)), active === undefined ? 50 : 1700);
    return () => clearTimeout(t);
  }, [playing, active, steps.length]);

  const current = active !== undefined && active < steps.length ? steps[active] : undefined;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-line bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-[2.75rem] text-sm" aria-live="polite">
          {current ? (
            <>
              <p className="flex items-center gap-2 font-semibold text-ink">
                <span className={`h-2 w-2 rounded-[2px] ${stepKindMeta[current.kind].dot}`} aria-hidden="true" />
                Step {active! + 1} of {steps.length} · {current.label}
              </p>
              <p className="mt-0.5 text-muted">{current.detail ?? current.tool}</p>
            </>
          ) : finished ? (
            <>
              <p className="font-semibold text-mint">✓ Workflow complete</p>
              <p className="mt-0.5 text-muted">Every step ran automatically, start to finish, with no copying or chasing.</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-ink">See it run</p>
              <p className="mt-0.5 text-muted">Press play to walk through the workflow one step at a time.</p>
            </>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              if (finished) setActive(undefined);
              setPlaying((p) => (finished ? true : !p));
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            <Icon name={playing ? "minus" : "arrow-right"} className="h-4 w-4" />
            {playing ? "Pause" : finished ? "Replay" : active === undefined ? "Play workflow" : "Resume"}
          </button>
          <button
            type="button"
            disabled={playing || (active ?? -1) >= steps.length}
            onClick={() => setActive((a) => (a === undefined ? 0 : a + 1))}
            className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/30 disabled:opacity-40"
          >
            Next step
          </button>
        </div>
      </div>
      <WorkflowDiagram steps={steps} showDetails={showDetails} active={active} />
    </div>
  );
}
