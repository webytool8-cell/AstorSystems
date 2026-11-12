"use client";

import { useMemo, useState } from "react";
import { Icon } from "../icons";
import { cx } from "../ui";
import { ActivityLog, DemoFrame, PanelTitle } from "./demo-frame";

type Stage = "New" | "Quoted" | "Follow-up" | "Booked";
type Lead = { id: number; name: string; summary: string; price: string; stage: Stage; isYou?: boolean };

const stages: Stage[] = ["New", "Quoted", "Follow-up", "Booked"];
const stageTone: Record<Stage, string> = {
  New: "bg-sun-soft text-sun",
  Quoted: "bg-accent-soft text-accent",
  "Follow-up": "bg-violet-soft text-violet",
  Booked: "bg-mint-soft text-mint",
};

/** Example pricing rules — in a real build these come from the business. */
const rules = {
  base: { house: 110, apartment: 90, office: 140 } as Record<string, number>,
  perBedroom: 22,
  perBathroom: 28,
  frequency: { "deep-clean": 1.6, weekly: 0.8, biweekly: 0.9, monthly: 1 } as Record<string, number>,
  addOns: { oven: 25, fridge: 25, windows: 40 } as Record<string, number>,
};

const frequencyLabels: Record<string, string> = {
  "deep-clean": "One-time deep clean",
  weekly: "Weekly",
  biweekly: "Every two weeks",
  monthly: "Monthly",
};

const round5 = (n: number) => Math.round(n / 5) * 5;

const seed: Lead[] = [
  { id: 1, name: "Jordan L.", summary: "Apartment · 2 bed · weekly", price: "$135–$150", stage: "Booked" },
  { id: 2, name: "Sam K.", summary: "House · 4 bed · deep clean", price: "$330–$365", stage: "Follow-up" },
  { id: 3, name: "Riverside Dental", summary: "Office · monthly", price: "$180–$200", stage: "New" },
];

export function CleaningDemo() {
  const [form, setForm] = useState({ name: "", type: "house", bedrooms: 3, bathrooms: 2, frequency: "biweekly", addOns: [] as string[] });
  const [leads, setLeads] = useState<Lead[]>(seed);
  const [log, setLog] = useState<{ text: string; tone: "mint" | "accent" | "sun" | "violet" }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const estimate = useMemo(() => {
    const isOffice = form.type === "office";
    let price =
      rules.base[form.type] +
      (isOffice ? 0 : form.bedrooms * rules.perBedroom) +
      form.bathrooms * rules.perBathroom;
    price *= rules.frequency[form.frequency];
    price += form.addOns.reduce((sum, a) => sum + rules.addOns[a], 0);
    return { low: round5(price * 0.93), high: round5(price * 1.07) };
  }, [form]);

  const you = leads.find((l) => l.isYou);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please enter a name for the sample customer.");
      return;
    }
    setError("");
    const summary = `${form.type[0].toUpperCase()}${form.type.slice(1)}${form.type === "office" ? "" : ` · ${form.bedrooms} bed`} · ${frequencyLabels[form.frequency].toLowerCase()}`;
    const lead: Lead = { id: Date.now(), name: form.name.trim(), summary, price: `$${estimate.low}–$${estimate.high}`, stage: "Quoted", isYou: true };
    setLeads((ls) => [...ls.filter((l) => !l.isYou), lead]);
    setSubmitted(true);
    setLog([
      { text: "Quote request received from website form", tone: "accent" },
      { text: `Estimate calculated from pricing rules: ${lead.price}`, tone: "accent" },
      { text: "Lead created in pipeline · stage: Quoted", tone: "violet" },
      { text: "Text sent to customer with estimate and booking link", tone: "mint" },
      { text: "Follow-ups scheduled: day 2, day 5, day 10", tone: "violet" },
    ]);
  }

  function move(stage: Stage, entries: typeof log) {
    setLeads((ls) => ls.map((l) => (l.isYou ? { ...l, stage } : l)));
    setLog((l) => [...l, ...entries]);
  }

  function reset() {
    setLeads(seed);
    setLog([]);
    setSubmitted(false);
  }

  return (
    <DemoFrame title="Sparkle & Co. Cleaning · quotes and pipeline (sample business)">
      <div className="grid lg:grid-cols-[1fr_1.35fr]">
        {/* Customer side */}
        <form onSubmit={submit} className="space-y-4 border-b border-line p-5 lg:border-b-0 lg:border-r" noValidate>
          <PanelTitle aside={<span className="text-xs text-muted">Customer view</span>}>Request a quote</PanelTitle>
          <div>
            <label htmlFor="demo-name" className="text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="demo-name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none"
            />
            {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-ink">Property type</legend>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {["house", "apartment", "office"].map((t) => (
                <label key={t} className={cx("cursor-pointer rounded-xl border px-3 py-2 text-center text-sm capitalize", form.type === t ? "border-accent bg-accent-soft font-medium text-accent-strong" : "border-line text-ink")}>
                  <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => update("type", t)} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            {form.type !== "office" && (
              <Stepper label="Bedrooms" value={form.bedrooms} min={1} max={6} onChange={(v) => update("bedrooms", v)} />
            )}
            <Stepper label="Bathrooms" value={form.bathrooms} min={1} max={5} onChange={(v) => update("bathrooms", v)} />
          </div>
          <div>
            <label htmlFor="demo-frequency" className="text-sm font-medium text-ink">
              How often?
            </label>
            <select
              id="demo-frequency"
              value={form.frequency}
              onChange={(e) => update("frequency", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              {Object.entries(frequencyLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-ink">Extras</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {[
                ["oven", "Inside oven"],
                ["fridge", "Inside fridge"],
                ["windows", "Interior windows"],
              ].map(([v, l]) => {
                const on = form.addOns.includes(v);
                return (
                  <label key={v} className={cx("cursor-pointer rounded-full border px-3 py-1.5 text-sm", on ? "border-accent bg-accent-soft text-accent-strong" : "border-line text-ink")}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => update("addOns", on ? form.addOns.filter((a) => a !== v) : [...form.addOns, v])}
                    />
                    {l}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="rounded-2xl bg-ink p-4 text-white" aria-live="polite">
            <p className="text-xs text-muted-dark">Instant estimate</p>
            <p className="mt-1 text-3xl font-semibold">
              ${estimate.low}–${estimate.high}
            </p>
            <p className="mt-1 text-xs text-muted-dark">Per visit · final price confirmed after a quick walkthrough</p>
          </div>
          <button type="submit" className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong">
            {submitted ? "Update my quote" : "Get my quote"}
          </button>
        </form>

        {/* Business side */}
        <div className="bg-paper/40 p-5">
          <PanelTitle
            aside={
              <button type="button" onClick={reset} className="text-xs font-medium text-accent hover:underline">
                Reset demo
              </button>
            }
          >
            Business view · lead pipeline
          </PanelTitle>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage} className="min-h-32 rounded-xl border border-line bg-white/70 p-2">
                <p className="flex items-center justify-between px-1 text-xs font-semibold text-ink">
                  {stage}
                  <span className="text-muted-2">{leads.filter((l) => l.stage === stage).length}</span>
                </p>
                <ul className="mt-2 space-y-2">
                  {leads
                    .filter((l) => l.stage === stage)
                    .map((l) => (
                      <li key={l.id} className={cx("animate-rise rounded-lg border bg-white p-2 text-xs shadow-[var(--shadow-card)]", l.isYou ? "border-accent ring-2 ring-accent/20" : "border-line")}>
                        <p className="font-semibold text-ink">
                          {l.name} {l.isYou && <span className="text-accent">· you</span>}
                        </p>
                        <p className="mt-0.5 text-muted">{l.summary}</p>
                        <p className={cx("mt-1.5 inline-block rounded-full px-1.5 py-0.5 font-medium", stageTone[l.stage])}>{l.price}</p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {you && you.stage !== "Booked" && (
            <div className="mt-4 rounded-xl border border-dashed border-line-strong bg-white p-3">
              <p className="text-xs font-medium text-muted">Simulate what happens next</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {you.stage === "Quoted" && (
                  <button
                    type="button"
                    onClick={() => move("Follow-up", [{ text: "Day 2 · no reply → friendly check-in text sent", tone: "violet" }])}
                    className="rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-ink/30"
                  >
                    Customer doesn’t reply for 2 days
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    move("Booked", [
                      { text: "Customer replied “Book it” · remaining follow-ups cancelled", tone: "mint" },
                      { text: "Booking link used · first visit Thu 10:00am", tone: "mint" },
                      { text: "Customer record + calendar event created", tone: "violet" },
                    ])
                  }
                  className="rounded-full bg-mint px-3.5 py-1.5 text-xs font-semibold text-white"
                >
                  Customer replies “Book it”
                </button>
              </div>
            </div>
          )}

          <div className="mt-5">
            <PanelTitle>Automation activity</PanelTitle>
            {submitted ? (
              <ActivityLog items={log} />
            ) : (
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-2">
                <Icon name="arrow-right" className="h-4 w-4 rotate-180 lg:rotate-180" /> Submit a quote to see it arrive here.
              </p>
            )}
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <span className="text-sm font-medium text-ink" id={`stepper-${label}`}>
        {label}
      </span>
      <div className="mt-1.5 flex items-center justify-between rounded-xl border border-line px-1.5 py-1" role="group" aria-labelledby={`stepper-${label}`}>
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="h-8 w-8 rounded-lg text-lg text-ink hover:bg-paper disabled:opacity-30">
          −
        </button>
        <span className="text-sm font-semibold text-ink" aria-live="polite">
          {value}
        </span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="h-8 w-8 rounded-lg text-lg text-ink hover:bg-paper disabled:opacity-30">
          +
        </button>
      </div>
    </div>
  );
}
