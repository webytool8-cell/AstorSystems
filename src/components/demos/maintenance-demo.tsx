"use client";

import { useState } from "react";
import { cx } from "../ui";
import { ActivityLog, DemoFrame, PanelTitle } from "./demo-frame";

type Trade = "Plumbing" | "Electrical" | "Heating & cooling" | "Appliance" | "General";
type Urgency = "Emergency" | "High" | "Routine";
type Status = "New" | "Assigned" | "Scheduled" | "Completed";

/** Example classification rules. In production an AI model handles free-form wording; rules act as guardrails. */
const tradeRules: [Trade, RegExp][] = [
  ["Appliance", /\b(fridge|refrigerator|oven|stove|dishwasher|washer|dryer|microwave)/i],
  ["Plumbing", /\b(leak|leaking|water|sink|toilet|drain|pipe|faucet|shower|clog)/i],
  ["Heating & cooling", /\b(heat|heating|furnace|a\/?c|air con|thermostat|radiator|cold air|warm air)/i],
  ["Electrical", /\b(light|outlet|power|electric|breaker|switch|socket|spark)/i],
];
const emergencyRule = /\b(flood|flooding|gas|sparks?|smoke|fire|sewage|no heat|burst)/i;
const highRule = /\b(not working|no power|broken|won'?t|doesn'?t|stopped)/i;

const vendors: Record<Trade, string> = {
  Plumbing: "Northside Plumbing (sample vendor)",
  "Heating & cooling": "Comfort Air Services (sample vendor)",
  Electrical: "Brightline Electric (sample vendor)",
  Appliance: "Metro Appliance Repair (sample vendor)",
  General: "In-house maintenance team",
};

const examples = ["Water leaking under the kitchen sink", "Bedroom light switch not working", "No heat in the apartment since last night", "Dishwasher won't drain"];

const flow: { status: Status; button: string; tenantText: (o: Order) => string; log: (o: Order) => string }[] = [
  { status: "Assigned", button: "Vendor accepts job", tenantText: (o) => `Update on request #${o.id}: ${o.vendor.replace(" (sample vendor)", "")} has been assigned.`, log: (o) => `${o.vendor.replace(" (sample vendor)", "")} accepted the job` },
  { status: "Scheduled", button: "Vendor proposes a time", tenantText: (o) => `Request #${o.id}: visit scheduled for tomorrow 9–11am. Reply if this doesn't work.`, log: () => "Visit scheduled · tomorrow 9–11am" },
  { status: "Completed", button: "Vendor marks complete", tenantText: (o) => `Request #${o.id} is marked complete. Reply 1 if resolved, 2 if there's still a problem.`, log: () => "Completion photos and notes attached · invoice requested" },
];

type Order = { id: number; unit: string; description: string; trade: Trade; urgency: Urgency; reasons: string[]; vendor: string; status: Status };

function classify(description: string, activeLeak: boolean) {
  const reasons: string[] = [];
  let trade: Trade = "General";
  for (const [t, re] of tradeRules) {
    const m = description.match(re);
    if (m) {
      trade = t;
      reasons.push(`“${m[0].toLowerCase()}” → ${t}`);
      break;
    }
  }
  let urgency: Urgency = "Routine";
  const em = description.match(emergencyRule);
  if (activeLeak && trade === "Plumbing") {
    urgency = "Emergency";
    reasons.push("Tenant confirmed water is actively leaking → Emergency");
  } else if (em) {
    urgency = "Emergency";
    reasons.push(`“${em[0].toLowerCase()}” → Emergency`);
  } else if (highRule.test(description) || trade !== "General") {
    const hm = description.match(highRule);
    urgency = hm ? "High" : "Routine";
    if (hm) reasons.push(`“${hm[0].toLowerCase()}” → High priority`);
  }
  if (reasons.length === 0) reasons.push("No specific keywords → General, Routine");
  return { trade, urgency, reasons };
}

const urgencyTone: Record<Urgency, string> = {
  Emergency: "bg-rose-soft text-[#b4443a]",
  High: "bg-sun-soft text-sun",
  Routine: "bg-mint-soft text-mint",
};
const statuses: Status[] = ["New", "Assigned", "Scheduled", "Completed"];

export function MaintenanceDemo() {
  const [unit, setUnit] = useState("4B");
  const [description, setDescription] = useState("");
  const [activeLeak, setActiveLeak] = useState(false);
  const [entry, setEntry] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [log, setLog] = useState<{ text: string; tone: "mint" | "accent" | "sun" | "violet" }[]>([]);
  const [texts, setTexts] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [nextId, setNextId] = useState(1042);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 6) {
      setError("Please describe the problem (or tap an example).");
      return;
    }
    setError("");
    const c = classify(description, activeLeak);
    const o: Order = { id: nextId, unit, description: description.trim(), vendor: vendors[c.trade], status: "New", ...c };
    setNextId((n) => n + 1);
    setOrder(o);
    const entries: typeof log = [
      { text: `Request received from Unit ${unit}`, tone: "accent" },
      { text: `Classified as ${c.trade} · ${c.urgency}`, tone: "violet" },
      { text: `Work order #${o.id} created`, tone: "violet" },
    ];
    if (c.urgency === "Emergency") entries.push({ text: "On-call contact called and texted immediately", tone: "sun" });
    entries.push({ text: `Job offered to ${o.vendor.replace(" (sample vendor)", "")}`, tone: "accent" });
    if (!entry) entries.push({ text: "Tenant asked for a time to be home (no entry permission)", tone: "sun" });
    setLog(entries);
    setTexts([`Thanks — we received your request (#${o.id}). ${c.urgency === "Emergency" ? "This has been marked urgent and our on-call team has been notified." : "We'll update you when a technician is assigned."}`]);
  }

  function advance() {
    if (!order) return;
    const idx = statuses.indexOf(order.status);
    const step = flow[idx];
    if (!step) return;
    const next = { ...order, status: step.status };
    setOrder(next);
    setLog((l) => [...l, { text: step.log(next), tone: step.status === "Completed" ? "mint" : "accent" }]);
    setTexts((t) => [...t, step.tenantText(next)]);
  }

  function reset() {
    setOrder(null);
    setLog([]);
    setTexts([]);
    setDescription("");
    setActiveLeak(false);
  }

  const nextStep = order ? flow[statuses.indexOf(order.status)] : undefined;

  return (
    <DemoFrame title="Harbor Residences · maintenance portal (sample property)">
      <div className="grid lg:grid-cols-[1fr_1.35fr]">
        <form onSubmit={submit} className="space-y-4 border-b border-line p-5 lg:border-b-0 lg:border-r" noValidate>
          <PanelTitle aside={<span className="text-xs text-muted">Tenant view</span>}>Report a maintenance issue</PanelTitle>
          <div>
            <label htmlFor="m-unit" className="text-sm font-medium text-ink">
              Unit
            </label>
            <select id="m-unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none">
              {["1A", "2C", "4B", "6D"].map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="m-desc" className="text-sm font-medium text-ink">
              What&rsquo;s the problem?
            </label>
            <textarea
              id="m-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in your own words"
              className="mt-1.5 w-full resize-none rounded-xl border border-line px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none"
            />
            {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {examples.map((ex) => (
                <button key={ex} type="button" onClick={() => setDescription(ex)} className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink hover:bg-paper-2">
                  {ex}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center justify-between gap-3 rounded-xl border border-line px-3.5 py-2.5 text-sm text-ink">
            Is water actively leaking right now?
            <input type="checkbox" checked={activeLeak} onChange={(e) => setActiveLeak(e.target.checked)} className="h-4 w-4 accent-[#2c5cff]" />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-xl border border-line px-3.5 py-2.5 text-sm text-ink">
            OK to enter if I&rsquo;m not home?
            <input type="checkbox" checked={entry} onChange={(e) => setEntry(e.target.checked)} className="h-4 w-4 accent-[#2c5cff]" />
          </label>
          <button type="submit" className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong">
            Submit request
          </button>

          <div>
            <p className="text-sm font-semibold text-ink">Texts the tenant receives</p>
            <div className="mt-2 space-y-2" aria-live="polite">
              {texts.length === 0 && <p className="text-sm text-muted-2">None yet.</p>}
              {texts.map((t, i) => (
                <p key={i} className="animate-rise rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5 text-sm text-ink">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </form>

        <div className="bg-paper/40 p-5">
          <PanelTitle
            aside={
              order && (
                <button type="button" onClick={reset} className="text-xs font-medium text-accent hover:underline">
                  Reset demo
                </button>
              )
            }
          >
            Property manager view
          </PanelTitle>

          {!order ? (
            <div className="mt-3 rounded-xl border border-dashed border-line-strong bg-white px-5 py-12 text-center text-sm text-muted">
              Submit a request to see the work order appear here.
            </div>
          ) : (
            <>
              <div className="mt-3 animate-rise rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    Work order #{order.id} · Unit {order.unit}
                  </p>
                  <span className={cx("rounded-full px-2.5 py-0.5 text-xs font-semibold", urgencyTone[order.urgency])}>{order.urgency}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted">&ldquo;{order.description}&rdquo;</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div className="rounded-lg bg-paper px-3 py-2">
                    <dt className="text-xs text-muted">Trade</dt>
                    <dd className="font-medium text-ink">{order.trade}</dd>
                  </div>
                  <div className="rounded-lg bg-paper px-3 py-2">
                    <dt className="text-xs text-muted">Assigned to</dt>
                    <dd className="font-medium text-ink">{order.vendor}</dd>
                  </div>
                </dl>
                <div className="mt-3">
                  <p className="text-xs font-medium text-muted">Why it was classified this way</p>
                  <ul className="mt-1 space-y-0.5 text-xs text-ink">
                    {order.reasons.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label="Work order status">
                  {statuses.map((s, i) => {
                    const reached = statuses.indexOf(order.status) >= i;
                    return (
                      <li key={s} className="text-center">
                        <span className={cx("block h-1.5 rounded-full", reached ? "bg-accent" : "bg-paper-2")} />
                        <span className={cx("mt-1 block text-[11px]", reached ? "font-semibold text-ink" : "text-muted-2")}>{s}</span>
                      </li>
                    );
                  })}
                </ol>
                {nextStep ? (
                  <button type="button" onClick={advance} className="mt-4 w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/40">
                    Simulate: {nextStep.button} →
                  </button>
                ) : (
                  <p className="mt-4 rounded-xl bg-mint-soft px-4 py-2.5 text-center text-sm font-semibold text-mint">Closed · full history saved</p>
                )}
              </div>
              <div className="mt-5">
                <PanelTitle>Automation activity</PanelTitle>
                <ActivityLog items={log} />
              </div>
            </>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
