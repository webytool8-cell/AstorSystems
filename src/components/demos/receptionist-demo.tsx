"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import { cx } from "../ui";
import { ActivityLog, DemoFrame, PanelTitle } from "./demo-frame";

type Speaker = "ai" | "caller" | "system";
type Fields = {
  name: string;
  phone: string;
  address: string;
  service: string;
  urgency: string;
  serviceArea: string;
  outcome: string;
};
type Event = {
  speaker: Speaker;
  text: string;
  capture?: Partial<Fields>;
  action?: { text: string; tone: "mint" | "accent" | "sun" | "violet" };
};

const scenarios: { id: string; label: string; description: string; events: Event[] }[] = [
  {
    id: "routine",
    label: "Routine repair",
    description: "AC not cooling, caller inside the service area",
    events: [
      { speaker: "ai", text: "Thanks for calling Rivera Heating & Air. I’m the automated assistant — I can take your details and get you booked. What’s your name?" },
      { speaker: "caller", text: "Hi, it’s Maria Gomez.", capture: { name: "Maria Gomez", phone: "(555) 014-2290 · caller ID" } },
      { speaker: "ai", text: "Thanks, Maria. What can we help with today?" },
      { speaker: "caller", text: "Our air conditioner is running but it’s blowing warm air.", capture: { service: "AC repair · not cooling" } },
      { speaker: "ai", text: "Got it. Is anyone at risk from the heat, or is it uncomfortable but manageable?" },
      { speaker: "caller", text: "Manageable, we have fans. But we’d like it fixed soon.", capture: { urgency: "Standard · same or next day" } },
      { speaker: "ai", text: "What’s the address for the visit?" },
      { speaker: "caller", text: "418 Maple Street.", capture: { address: "418 Maple St", serviceArea: "Inside service area ✓" }, action: { text: "Address checked against service area", tone: "accent" } },
      { speaker: "ai", text: "We have a technician available tomorrow between 8 and 10am, or 1 and 3pm. Which works better?" },
      { speaker: "caller", text: "Tomorrow morning, please.", capture: { outcome: "Booked · tomorrow 8–10am" }, action: { text: "Appointment added to technician calendar", tone: "mint" } },
      { speaker: "system", text: "Call ended", action: { text: "Lead created in CRM with transcript and summary", tone: "violet" } },
      { speaker: "system", text: "", action: { text: "Confirmation text sent to caller", tone: "mint" } },
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    description: "No heat in winter with a vulnerable occupant",
    events: [
      { speaker: "ai", text: "Thanks for calling Rivera Heating & Air. I’m the automated assistant. What’s your name?" },
      { speaker: "caller", text: "Dan Price. Our furnace stopped completely and it’s freezing.", capture: { name: "Dan Price", phone: "(555) 018-7741 · caller ID", service: "Furnace · no heat" } },
      { speaker: "ai", text: "I’m sorry, Dan. Is there anyone in the home who is elderly, very young or unwell?" },
      { speaker: "caller", text: "My mother is staying with us, she’s 82.", capture: { urgency: "EMERGENCY · vulnerable occupant" }, action: { text: "Emergency rule matched: no heat + vulnerable occupant", tone: "sun" } },
      { speaker: "ai", text: "Thank you. What’s your address?" },
      { speaker: "caller", text: "77 Birch Lane.", capture: { address: "77 Birch Ln", serviceArea: "Inside service area ✓" } },
      { speaker: "ai", text: "I’m connecting you to our on-call technician now. Please stay on the line." },
      { speaker: "system", text: "Warm transfer to on-call technician", capture: { outcome: "Transferred to on-call tech" }, action: { text: "On-call technician called with summary", tone: "sun" } },
      { speaker: "system", text: "", action: { text: "Emergency logged in CRM and office notified", tone: "violet" } },
    ],
  },
  {
    id: "out-of-area",
    label: "Out of area",
    description: "Caller outside the service area",
    events: [
      { speaker: "ai", text: "Thanks for calling Rivera Heating & Air. I’m the automated assistant. What’s your name?" },
      { speaker: "caller", text: "Priya Shah. I need a water heater replaced.", capture: { name: "Priya Shah", phone: "(555) 012-3308 · caller ID", service: "Water heater replacement" } },
      { speaker: "ai", text: "Happy to help. What’s the address for the job?" },
      { speaker: "caller", text: "It’s in Westbrook, 12 Harbor Road.", capture: { address: "12 Harbor Rd, Westbrook", serviceArea: "Outside service area ✗" }, action: { text: "Address checked: outside service area", tone: "sun" } },
      { speaker: "ai", text: "I’m sorry — Westbrook is outside our service area, so we wouldn’t be the right fit. I can text you a list of local companies we recommend. Would that help?" },
      { speaker: "caller", text: "Yes, that would be great.", capture: { urgency: "Not applicable", outcome: "Politely declined · referral sent" } },
      { speaker: "system", text: "Call ended", action: { text: "Referral text sent", tone: "mint" } },
      { speaker: "system", text: "", action: { text: "Logged as out-of-area (no staff time used)", tone: "violet" } },
    ],
  },
];

const emptyFields: Fields = { name: "", phone: "", address: "", service: "", urgency: "", serviceArea: "", outcome: "" };
const fieldLabels: [keyof Fields, string][] = [
  ["name", "Name"],
  ["phone", "Phone"],
  ["service", "Service needed"],
  ["urgency", "Urgency"],
  ["address", "Address"],
  ["serviceArea", "Service area"],
  ["outcome", "Outcome"],
];

export function ReceptionistDemo() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const scenario = scenarios.find((s) => s.id === scenarioId)!;
  const shown = scenario.events.slice(0, step);
  const done = step >= scenario.events.length;

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    const prev = scenario.events[step - 1];
    const delay = step === 0 ? 300 : Math.min(2200, 700 + (prev?.text.length ?? 0) * 18);
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [playing, step, done, scenario.events]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step]);

  const fields = shown.reduce<Fields>((acc, e) => ({ ...acc, ...e.capture }), emptyFields);
  const actions = shown.flatMap((e) => (e.action ? [e.action] : []));

  function choose(id: string) {
    setScenarioId(id);
    setStep(0);
    setPlaying(false);
  }

  return (
    <DemoFrame title="Rivera Heating & Air · AI receptionist (sample business)">
      <div className="border-b border-line p-5">
        <p className="text-sm font-medium text-ink">Choose a call scenario</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Call scenario">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={s.id === scenarioId}
              onClick={() => choose(s.id)}
              className={cx(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                s.id === scenarioId ? "border-accent bg-accent-soft" : "border-line bg-white hover:border-ink/30",
              )}
            >
              <span className="block text-sm font-semibold text-ink">{s.label}</span>
              <span className="mt-0.5 block text-xs text-muted">{s.description}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              if (done) setStep(0);
              setPlaying((p) => !p || done);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            <Icon name={playing ? "minus" : "phone"} className="h-4 w-4" />
            {playing ? "Pause" : done ? "Replay call" : step > 0 ? "Resume" : "Start call"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(scenario.events.length);
            }}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
          >
            Skip to end
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
          <PanelTitle
            aside={
              playing && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-mint">
                  <span className="h-2 w-2 animate-pulse-soft rounded-full bg-mint" /> Live
                </span>
              )
            }
          >
            Call transcript
          </PanelTitle>
          <div ref={transcriptRef} className="mt-4 h-[380px] space-y-3 overflow-y-auto pr-1" aria-live="polite">
            {shown.length === 0 && <p className="text-sm text-muted-2">Press “Start call” to begin.</p>}
            {shown.map((e, i) =>
              e.speaker === "system" ? (
                e.text ? (
                  <p key={i} className="py-1 text-center text-xs font-medium text-muted">
                    — {e.text} —
                  </p>
                ) : null
              ) : (
                <div key={i} className={cx("flex animate-rise", e.speaker === "caller" && "justify-end")}>
                  <div
                    className={cx(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      e.speaker === "ai" ? "rounded-bl-md bg-paper text-ink" : "rounded-br-md bg-accent text-white",
                    )}
                  >
                    <span className={cx("mb-0.5 block text-[11px] font-semibold", e.speaker === "ai" ? "text-violet" : "text-white/80")}>
                      {e.speaker === "ai" ? "AI receptionist" : "Caller"}
                    </span>
                    {e.text}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="bg-paper/40 p-5">
          <PanelTitle>Captured automatically</PanelTitle>
          <dl className="mt-3 divide-y divide-line rounded-xl border border-line bg-white">
            {fieldLabels.map(([key, label]) => (
              <div key={key} className="grid grid-cols-[7.5rem_1fr] gap-2 px-3.5 py-2 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className={cx("font-medium", fields[key] ? "text-ink" : "text-muted-2", key === "urgency" && fields.urgency.startsWith("EMERGENCY") && "text-sun")}>
                  {fields[key] || "—"}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <PanelTitle>Actions taken</PanelTitle>
            <ActivityLog items={actions} />
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
