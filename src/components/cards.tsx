import Link from "next/link";
import type { Industry, Integration, Solution, Workflow } from "@/content/types";
import { accessLabel, platformLabels } from "@/lib/content";
import { Icon } from "./icons";
import { NotificationPreview } from "./illustrations";
import { Photo } from "./photo";
import type { PhotoKey } from "@/content/photos";
import { IntegrationMark, StatusBadge, Tag, cx } from "./ui";
import { WorkflowMini } from "./workflow-diagram";

/** Rotating soft tints so grids of cards feel lively without extra imagery. */
const tints = [
  "bg-accent-soft text-accent",
  "bg-mint-soft text-mint",
  "bg-violet-soft text-violet",
  "bg-sun-soft text-sun",
  "bg-sky-soft text-accent-strong",
  "bg-rose-soft text-[#b4443a]",
];
export const tint = (i: number) => tints[i % tints.length];

const cardBase = "card-hover group flex h-full flex-col rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]";

export function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  return (
    <Link href={`/solutions/${solution.slug}`} className={cx(cardBase, "p-6")}>
      <span className={cx("flex h-12 w-12 items-center justify-center rounded-xl", tint(index))}>
        <Icon name={solution.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink">{solution.name}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{solution.tagline}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Learn more
        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function IndustryCard({ industry }: { industry: Industry; dark?: boolean }) {
  return (
    <Link href={`/industries/${industry.slug}`} className={cx(cardBase, "overflow-hidden")}>
      <div className="relative h-52 overflow-hidden">
        <Photo name={industry.slug as PhotoKey} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-4 bottom-4 transition-transform duration-300 group-hover:-translate-y-1">
          <NotificationPreview {...industry.preview} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <Icon name={industry.icon} className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-ink">{industry.shortName}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {industry.solutions
            .slice(0, 3)
            .map((s) => s.title)
            .join(" · ")}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          See how we help
          <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link href={`/workflows/${workflow.slug}`} className={cx(cardBase, "p-6")}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="accent">{workflow.function}</Tag>
        <Tag>{workflow.difficulty}</Tag>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{workflow.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{workflow.summary}</p>
      <div className="mt-6 rounded-xl bg-paper px-3 py-3">
        <WorkflowMini steps={workflow.steps} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <span className="text-muted">{workflow.platforms.map((p) => platformLabels[p]).join(" · ")}</span>
        <span className={cx("font-semibold", workflow.access.status === "implementation" ? "text-mint" : "text-muted")}>
          {accessLabel(workflow)}
        </span>
      </div>
    </Link>
  );
}

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Link href={`/integrations/${integration.slug}`} className={cx(cardBase, "p-5")}>
      <div className="flex items-start justify-between gap-3">
        <IntegrationMark mark={integration.mark} />
        <StatusBadge status={integration.status} />
      </div>
      <h3 className="mt-4 font-semibold text-ink">{integration.name}</h3>
      <p className="mt-0.5 text-xs text-muted-2">{integration.category}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{integration.summary}</p>
    </Link>
  );
}

export function ServiceCard({
  href,
  label,
  title,
  body,
  points,
  cta,
  image,
  photo,
}: {
  href: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  image: React.ReactNode;
  photo?: PhotoKey;
}) {
  return (
    <Link href={href} className={cx(cardBase, "overflow-hidden")}>
      <div className="relative h-56 overflow-hidden border-b border-line">
        {photo ? (
          <>
            <Photo name={photo} className="transition-transform duration-500 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-4 bottom-4">{image}</div>
          </>
        ) : (
          image
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[13px] font-semibold text-accent">{label}</p>
        <h3 className="mt-1.5 text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
        <ul className="mt-5 flex-1 space-y-2">
          {points.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-ink/85">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-mint" strokeWidth={2.25} />
              {p}
            </li>
          ))}
        </ul>
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {cta}
          <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
