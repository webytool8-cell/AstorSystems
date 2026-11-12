"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/content/industries";
import { integrations } from "@/content/integrations";
import { solutions } from "@/content/solutions";
import { workflows } from "@/content/workflows";
import type { Proposal } from "@/lib/intake/proposal";
import { proposalInquirySchema, fieldErrors, type FieldErrors } from "@/lib/inquiry";
import { Icon } from "../icons";
import { IntegrationMark, cx } from "../ui";

const byslug = <T extends { slug: string }>(xs: T[]) => new Map(xs.map((x) => [x.slug, x]));
const solutionMap = byslug(solutions);
const workflowMap = byslug(workflows);
const integrationMap = byslug(integrations);
const industryMap = byslug(industries);

const phaseMeta = {
  "start-here": { label: "Start here", tone: "bg-accent text-white" },
  next: { label: "Next", tone: "bg-violet-soft text-violet" },
  later: { label: "Later", tone: "bg-paper-2 text-muted" },
} as const;

export function ProposalView({ proposal, transcript }: { proposal: Proposal; transcript: string }) {
  const industry = industryMap.get(proposal.industry);
  const allIntegrations = [...new Set(proposal.systems.flatMap((s) => s.integrations))];

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-float)]" aria-label="Your preliminary proposal">
      <header className="relative overflow-hidden bg-navy-900 px-6 py-7 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/40 blur-3xl" aria-hidden="true" />
        <p className="relative text-xs font-semibold text-signal">Preliminary proposal · AI-assisted draft</p>
        <h2 className="relative mt-2 text-2xl font-semibold leading-tight">
          {proposal.businessName ? `Systems plan for ${proposal.businessName}` : "Your systems plan"}
        </h2>
        {industry && <p className="relative mt-1 text-sm text-muted-dark">{industry.name}</p>}
        <p className="relative mt-4 text-sm leading-relaxed text-white/85">{proposal.summary}</p>
      </header>

      <div className="space-y-7 p-6">
        <section>
          <h3 className="text-sm font-semibold text-ink">What you want to achieve</h3>
          <ul className="mt-2.5 space-y-1.5">
            {proposal.goals.map((g) => (
              <li key={g} className="flex gap-2.5 text-sm text-ink/85">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-mint" strokeWidth={2.5} />
                {g}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-ink">Recommended systems</h3>
          <ol className="mt-3 space-y-3">
            {proposal.systems.map((s, i) => {
              const sol = solutionMap.get(s.solution);
              const phase = phaseMeta[s.phase];
              return (
                <li key={`${s.name}-${i}`} className="rounded-2xl border border-line bg-paper/50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-ink">
                      <span className="mr-2 text-muted-2">{i + 1}.</span>
                      {s.name}
                    </p>
                    <span className={cx("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", phase.tone)}>{phase.label}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-ink">The problem: </span>
                    {s.problem}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-ink">What we&rsquo;d build: </span>
                    {s.howItWorks}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {sol && (
                      <Link href={`/solutions/${sol.slug}`} target="_blank" className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-strong hover:underline">
                        {sol.name}
                      </Link>
                    )}
                    {s.workflows.map((w) => {
                      const wf = workflowMap.get(w);
                      return wf ? (
                        <Link key={w} href={`/workflows/${w}`} target="_blank" className="rounded-full border border-line bg-white px-2.5 py-1 text-xs text-ink hover:border-ink/30">
                          {wf.name}
                        </Link>
                      ) : null;
                    })}
                    {s.workflows.length === 0 && <span className="rounded-full border border-dashed border-line-strong px-2.5 py-1 text-xs text-muted">Custom build</span>}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {allIntegrations.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-ink">Systems we&rsquo;d connect</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {allIntegrations.map((slug) => {
                const int = integrationMap.get(slug);
                if (!int) return null;
                return (
                  <li key={slug} className="flex items-center gap-2 rounded-xl border border-line bg-white py-1.5 pl-1.5 pr-3">
                    <IntegrationMark mark={int.mark} size="sm" />
                    <span className="text-sm text-ink">{int.name}</span>
                    {int.status === "planned" && <span className="text-[10px] font-medium text-muted">planned</span>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {proposal.currentTools.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-ink">Tools you use today</h3>
            <p className="mt-1.5 text-sm text-muted">{proposal.currentTools.join(", ")}</p>
          </section>
        )}

        <section className="rounded-2xl bg-mint-soft p-4">
          <h3 className="text-sm font-semibold text-mint">Quickest win</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink">{proposal.quickWin}</p>
        </section>

        {proposal.openQuestions.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-ink">To confirm on a call</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {proposal.openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs leading-relaxed text-muted">
          This is a starting point drafted by our AI assistant from your conversation. A member of our team reviews it before
          anything is agreed; scope and pricing are confirmed in a written proposal.
        </p>

        <SendProposal proposal={proposal} transcript={transcript} />
      </div>
    </article>
  );
}

function SendProposal({ proposal, transcript }: { proposal: Proposal; transcript: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const payload = { kind: "proposal", ...fd, company: (fd.company as string) || proposal.businessName, proposal, transcript: transcript.slice(-20000) };
    const parsed = proposalInquirySchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string };
      if (res.ok && data.ok && data.reference) {
        setReference(data.reference);
        setState("sent");
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
        setState("idle");
      }
    } catch {
      setError("Network error. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-mint/30 bg-mint-soft p-5" role="status">
        <p className="font-semibold text-mint">Proposal sent ✓</p>
        <p className="mt-1 text-sm text-ink">We&rsquo;ll review it and reply within two business days to arrange a short call.</p>
        <p className="mt-2 font-mono text-xs text-muted">Reference: {reference}</p>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none";
  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-2xl border border-line bg-paper p-5">
      <p className="font-semibold text-ink">Send this to Astor Systems</p>
      <p className="mt-1 text-sm text-muted">We&rsquo;ll review your proposal and get back to you — no obligation.</p>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="p-name" className="text-xs font-medium text-ink">
            Name <span className="text-accent">*</span>
          </label>
          <input id="p-name" name="name" autoComplete="name" className={cx(input, "mt-1")} aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="p-email" className="text-xs font-medium text-ink">
            Email <span className="text-accent">*</span>
          </label>
          <input id="p-email" name="email" type="email" autoComplete="email" className={cx(input, "mt-1")} aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="p-company" className="text-xs font-medium text-ink">
            Business name
          </label>
          <input id="p-company" name="company" defaultValue={proposal.businessName} autoComplete="organization" className={cx(input, "mt-1")} />
        </div>
        <div>
          <label htmlFor="p-phone" className="text-xs font-medium text-ink">
            Phone
          </label>
          <input id="p-phone" name="phone" type="tel" autoComplete="tel" className={cx(input, "mt-1")} />
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : "Send proposal for review"}
        <Icon name="arrow-right" className="h-4 w-4" />
      </button>
      <p className="mt-2 text-center text-[11px] text-muted">
        Includes your proposal and chat transcript. See our{" "}
        <Link href="/privacy" className="underline">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
