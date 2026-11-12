import { cx } from "../ui";

/** Window chrome around an interactive demo, with an always-visible prototype label. */
export function DemoFrame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cx("overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-float)]", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/70 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f2b8b5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f5d9a3]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#b9e3c9]" />
          </span>
          <span className="text-sm font-medium text-ink">{title}</span>
        </div>
        <span className="rounded-full bg-sun-soft px-2.5 py-0.5 text-xs font-semibold text-sun">Prototype · sample data</span>
      </div>
      {children}
    </div>
  );
}

export function PanelTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold text-ink">{children}</h3>
      {aside}
    </div>
  );
}

export function ActivityLog({ items }: { items: { text: string; tone?: "mint" | "accent" | "sun" | "violet" }[] }) {
  const dot = { mint: "bg-mint", accent: "bg-accent", sun: "bg-sun", violet: "bg-violet" };
  if (items.length === 0) return <p className="mt-3 text-sm text-muted-2">Nothing yet.</p>;
  return (
    <ol className="mt-3 space-y-2" aria-live="polite">
      {items.map((it, i) => (
        <li key={`${it.text}-${i}`} className="flex animate-rise items-start gap-2.5 text-sm text-ink">
          <span className={cx("mt-1.5 h-2 w-2 shrink-0 rounded-full", dot[it.tone ?? "accent"])} aria-hidden="true" />
          {it.text}
        </li>
      ))}
    </ol>
  );
}
