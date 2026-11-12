import Link from "next/link";
import type { IntegrationStatus } from "@/content/types";
import { Icon } from "./icons";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary: "bg-ink text-white hover:bg-navy-800",
  ghost: "text-ink hover:text-accent",
  light: "bg-white text-ink hover:bg-paper-2",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors",
        variant === "ghost" && "px-0",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
      {arrow && <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function Eyebrow({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cx("eyebrow flex items-center gap-2", dark ? "text-accent-bright" : "text-accent", className)}>
      <span className={cx("inline-block h-px w-5", dark ? "bg-accent-bright" : "bg-accent")} aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow dark={dark} className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
        <h2 className={cx("mt-4 text-3xl font-semibold leading-tight sm:text-4xl", dark ? "text-white" : "text-ink")}>{title}</h2>
        {intro && <p className={cx("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-muted-dark" : "text-muted")}>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "accent" | "dark" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        tone === "neutral" && "bg-paper-2 text-muted",
        tone === "accent" && "bg-accent-soft text-accent-strong",
        tone === "dark" && "bg-white/10 text-muted-dark",
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: IntegrationStatus }) {
  const supported = status === "supported";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        supported ? "border-emerald-700/20 bg-emerald-50 text-emerald-800" : "border-line bg-paper text-muted",
      )}
    >
      <span className={cx("h-1.5 w-1.5 rounded-full", supported ? "bg-emerald-600" : "bg-muted-2")} aria-hidden="true" />
      {supported ? "Supported" : "Planned"}
    </span>
  );
}

export function IntegrationMark({ mark, size = "md", dark = false }: { mark: string; size?: "sm" | "md" | "lg"; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-md border font-mono font-medium",
        dark ? "border-line-dark bg-navy-800 text-white" : "border-line bg-white text-ink",
        size === "sm" && "h-8 w-8 text-[11px]",
        size === "md" && "h-10 w-10 text-xs",
        size === "lg" && "h-14 w-14 text-sm",
      )}
    >
      {mark}
    </span>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Breadcrumbs({ items, dark = false }: { items: { name: string; href?: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cx("flex flex-wrap items-center gap-2 font-mono text-xs", dark ? "text-muted-dark" : "text-muted")}>
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className={cx("hover:underline", dark ? "hover:text-white" : "hover:text-ink")}>
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={cx("flex gap-3 text-sm leading-relaxed", dark ? "text-muted-dark" : "text-muted")}>
          <Icon name="check" className={cx("mt-0.5 h-4 w-4 shrink-0", dark ? "text-signal" : "text-accent")} strokeWidth={2} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
