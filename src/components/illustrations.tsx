/**
 * Product-style illustrations of the systems Astor Systems builds: phones receiving
 * automated texts, dashboards, a workflow builder, a template library and monitoring.
 * Drawn in HTML/CSS so they stay crisp, load instantly and match the brand.
 * All names, numbers and messages are illustrative.
 */
import { Icon } from "./icons";
import { cx } from "./ui";

type Msg = { from: "customer" | "business"; text: string };

export function PhoneMockup({
  business,
  messages,
  className,
}: {
  business: string;
  messages: Msg[];
  className?: string;
}) {
  return (
    <div
      className={cx("w-[230px] rounded-[34px] border border-ink/10 bg-ink p-[7px] shadow-[var(--shadow-float)]", className)}
      role="img"
      aria-label={`Example text conversation with ${business}: ${messages.map((m) => m.text).join(" / ")}`}
    >
      <div className="overflow-hidden rounded-[28px] bg-white">
        <div className="flex flex-col items-center gap-1 border-b border-line/70 bg-paper/60 px-4 pb-2.5 pt-3">
          <span className="mb-1 h-1 w-10 rounded-full bg-ink/15" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
            {business
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span className="text-[11px] font-medium text-ink">{business}</span>
        </div>
        <div className="space-y-2 px-3 py-3.5">
          {messages.map((m, i) => (
            <p
              key={i}
              className={cx(
                "max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug",
                m.from === "customer" ? "rounded-bl-md bg-paper-2 text-ink" : "ml-auto rounded-br-md bg-accent text-white",
              )}
            >
              {m.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Toast({ icon = "check", tone = "mint", title, detail, className }: { icon?: "check" | "calendar" | "inbox" | "chart"; tone?: "mint" | "accent" | "sun" | "violet"; title: string; detail?: string; className?: string }) {
  const tones = {
    mint: "bg-mint-soft text-mint",
    accent: "bg-accent-soft text-accent",
    sun: "bg-sun-soft text-sun",
    violet: "bg-violet-soft text-violet",
  };
  return (
    <div className={cx("flex items-center gap-3 rounded-xl border border-line/80 bg-white px-3.5 py-2.5 shadow-[var(--shadow-lift)]", className)} aria-hidden="true">
      <span className={cx("flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl", tones[tone])}>
        <Icon name={icon} className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-semibold text-ink">{title}</span>
        {detail && <span className="block text-[11px] text-muted">{detail}</span>}
      </span>
    </div>
  );
}

/** A simple "today" dashboard of the kind we set up for owners. */
export function DashboardMockup({ className }: { className?: string }) {
  const bars = [38, 52, 44, 70, 58, 82, 66];
  const rows = [
    { name: "Maria G.", what: "AC repair · today", status: "Booked", tone: "bg-mint-soft text-mint" },
    { name: "Dan P.", what: "Water heater quote", status: "Follow-up sent", tone: "bg-accent-soft text-accent" },
    { name: "Priya S.", what: "Annual tune-up", status: "New", tone: "bg-sun-soft text-sun" },
  ];
  return (
    <div className={cx("overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-float)]", className)} role="img" aria-label="Example dashboard showing today's inquiries, bookings and follow-ups">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2b8b5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f5d9a3]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b9e3c9]" />
        </div>
        <span className="text-[11px] font-medium text-muted">Today at a glance</span>
        <span className="h-2.5 w-10" />
      </div>
      <div className="grid grid-cols-3 gap-3 px-5 pt-4">
        {[
          ["New inquiries", "12", "text-accent"],
          ["Booked", "7", "text-mint"],
          ["Follow-ups sent", "18", "text-violet"],
        ].map(([k, v, c]) => (
          <div key={k} className="rounded-xl bg-paper px-3 py-2.5">
            <p className="text-[10px] text-muted">{k}</p>
            <p className={cx("mt-0.5 text-xl font-semibold", c)}>{v}</p>
          </div>
        ))}
      </div>
      <div className="flex h-20 items-end gap-2 px-5 pt-4" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} className={cx("flex-1 rounded-t-md", i === bars.length - 2 ? "bg-accent" : "bg-accent-soft")} style={{ height: `${h}%` }} />
        ))}
      </div>
      <ul className="mt-3 divide-y divide-line border-t border-line">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3 px-5 py-2.5">
            <span className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper-2 text-[9px] font-semibold text-ink">
                {r.name[0]}
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-medium text-ink">{r.name}</span>
                <span className="block text-[10px] text-muted">{r.what}</span>
              </span>
            </span>
            <span className={cx("rounded-full px-2 py-0.5 text-[10px] font-medium", r.tone)}>{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Workflow builder canvas: used for the implementation service card. */
export function BuilderIllustration() {
  const nodes = [
    { x: "8%", y: "18%", label: "New inquiry", tone: "bg-accent text-white" },
    { x: "38%", y: "46%", label: "AI sorts it", tone: "bg-violet text-white" },
    { x: "68%", y: "16%", label: "Book visit", tone: "bg-white text-ink border border-line" },
    { x: "68%", y: "68%", label: "Text customer", tone: "bg-white text-ink border border-line" },
  ];
  return (
    <div className="bg-dots relative h-full w-full bg-sky-soft" role="img" aria-label="Illustration of a workflow builder connecting a new inquiry to an AI step, a booking and a customer text">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M24 26 C 34 26, 32 54, 40 54" stroke="#2c5cff" strokeWidth="0.6" fill="none" strokeDasharray="1.5 1.5" className="animate-dash" vectorEffect="non-scaling-stroke" />
        <path d="M56 54 C 64 54, 60 24, 70 24" stroke="#2c5cff" strokeWidth="0.6" fill="none" strokeDasharray="1.5 1.5" className="animate-dash" vectorEffect="non-scaling-stroke" />
        <path d="M56 54 C 64 54, 60 76, 70 76" stroke="#2c5cff" strokeWidth="0.6" fill="none" strokeDasharray="1.5 1.5" className="animate-dash" vectorEffect="non-scaling-stroke" />
      </svg>
      {nodes.map((n) => (
        <span
          key={n.label}
          className={cx("absolute whitespace-nowrap rounded-2xl px-2.5 py-1.5 text-[11px] font-medium shadow-[var(--shadow-card)]", n.tone)}
          style={{ left: n.x, top: n.y }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}

/** Template library grid: used for the workflow templates service card. */
export function LibraryIllustration() {
  const items = [
    ["Missed-call text-back", "bg-accent"],
    ["Appointment reminders", "bg-mint"],
    ["Quote follow-up", "bg-violet"],
    ["Invoice processing", "bg-sun"],
  ];
  return (
    <div className="flex h-full w-full items-center justify-center bg-violet-soft p-5" role="img" aria-label="Illustration of a library of ready-made workflow templates">
      <div className="grid w-full max-w-[290px] grid-cols-2 gap-2.5">
        {items.map(([label, dot], i) => (
          <div key={label} className={cx("rounded-xl border border-white bg-white/90 p-3 shadow-[var(--shadow-card)]", i === 1 && "translate-y-2", i === 3 && "translate-y-2")}>
            <span className={cx("block h-1.5 w-6 rounded-full", dot)} />
            <span className="mt-2.5 block text-[11px] font-medium leading-tight text-ink">{label}</span>
            <span className="mt-2 flex gap-1" aria-hidden="true">
              <span className="h-1 w-6 rounded-full bg-paper-2" />
              <span className="h-1 w-4 rounded-full bg-paper-2" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Monitoring panel: used for the managed services card. */
export function MonitorIllustration() {
  const checks = [
    ["Lead intake", "Healthy"],
    ["SMS reminders", "Healthy"],
    ["CRM sync", "Healthy"],
  ];
  return (
    <div className="flex h-full w-full items-center justify-center bg-mint-soft p-5" role="img" aria-label="Illustration of a monitoring panel showing healthy automations">
      <div className="w-full max-w-[280px] rounded-xl border border-white bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-ink">System status</span>
          <span className="flex items-center gap-1 rounded-full bg-mint-soft px-2 py-0.5 text-[10px] font-medium text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-mint" /> All good
          </span>
        </div>
        <ul className="mt-2.5 space-y-1.5">
          {checks.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between rounded-2xl bg-paper px-2.5 py-1.5 text-[11px]">
              <span className="text-ink">{k}</span>
              <span className="flex items-center gap-1 text-mint">
                <Icon name="check" className="h-3 w-3" strokeWidth={2.5} /> {v}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2.5 flex h-4 items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="flex-1 rounded-sm bg-mint/70" style={{ height: `${55 + ((i * 37) % 45)}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Lock-screen style notification used on industry cards. */
export function NotificationPreview({ app, title, body, tone = "accent" }: { app: string; title: string; body: string; tone?: "accent" | "mint" | "sun" | "violet" }) {
  const dot = { accent: "bg-accent", mint: "bg-mint", sun: "bg-sun", violet: "bg-violet" }[tone];
  return (
    <div className="w-full rounded-xl border border-white/80 bg-white/95 p-3 shadow-[var(--shadow-card)] backdrop-blur" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted">
          <span className={cx("h-3.5 w-3.5 rounded", dot)} />
          {app}
        </span>
        <span className="text-[10px] text-muted-2">now</span>
      </div>
      <p className="mt-1.5 text-[12px] font-semibold leading-snug text-ink">{title}</p>
      <p className="mt-0.5 text-[11px] leading-snug text-muted">{body}</p>
    </div>
  );
}
