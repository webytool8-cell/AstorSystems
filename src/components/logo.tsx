import Link from "next/link";
import { cx } from "./ui";

/** Astor Systems mark: three connected nodes forming an "A" — systems joined by a single path. */
export function LogoMark({ className = "h-7 w-7", dark = false }: { className?: string; dark?: boolean }) {
  const stroke = dark ? "#ffffff" : "#070b14";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6" stroke={stroke} strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M8 24 L16 8 L24 24 M11.5 18.5 H20.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="8" r="2.4" fill="#2c5cff" />
      <circle cx="8" cy="24" r="2.4" fill={stroke} />
      <circle cx="24" cy="24" r="2.4" fill={stroke} />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={cx("inline-flex items-center gap-2.5", className)} aria-label="Astor Systems home">
      <LogoMark dark={dark} />
      <span className={cx("text-[15px] font-semibold tracking-tight", dark ? "text-white" : "text-ink")}>
        Astor<span className={dark ? "text-muted-dark" : "text-muted"}> Systems</span>
      </span>
    </Link>
  );
}
