"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { BusinessFunction, Workflow } from "@/content/types";
import { WorkflowCard } from "./cards";
import { Icon } from "./icons";

type Option = { value: string; label: string };

const functions: BusinessFunction[] = ["Sales", "Customer Service", "Operations", "Finance", "Administration"];
const platforms: Option[] = [
  { value: "n8n", label: "n8n" },
  { value: "make", label: "Make" },
  { value: "zapier", label: "Zapier" },
];

const FILTER_KEYS = ["industry", "function", "platform", "category"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

export function WorkflowLibrary({
  workflows,
  industries,
  categories,
}: {
  workflows: Workflow[];
  industries: Option[];
  categories: Option[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const filters: Record<FilterKey, string> = {
    industry: params.get("industry") ?? "",
    function: params.get("function") ?? "",
    platform: params.get("platform") ?? "",
    category: params.get("category") ?? "",
  };

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const industryLabel = useMemo(() => new Map(industries.map((i) => [i.value, i.label])), [industries]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workflows.filter((w) => {
      if (filters.industry && !w.industries.includes(filters.industry)) return false;
      if (filters.function && w.function !== filters.function) return false;
      if (filters.platform && !w.platforms.includes(filters.platform as Workflow["platforms"][number])) return false;
      if (filters.category && w.category !== filters.category) return false;
      if (!q) return true;
      const haystack = [w.name, w.summary, w.problem, w.function, ...w.industries.map((i) => industryLabel.get(i) ?? i), ...w.integrations]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [workflows, filters.industry, filters.function, filters.platform, filters.category, query, industryLabel]);

  const activeCount = FILTER_KEYS.filter((k) => filters[k]).length + (query ? 1 : 0);

  const selects: { key: FilterKey; label: string; options: Option[] }[] = [
    { key: "industry", label: "Industry", options: industries },
    { key: "function", label: "Business function", options: functions.map((f) => ({ value: f, label: f })) },
    { key: "platform", label: "Platform", options: platforms },
    { key: "category", label: "Category", options: categories },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
          <label htmlFor="workflow-search" className="sr-only">
            Search workflows
          </label>
          <input
            id="workflow-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setParam("q", e.target.value);
            }}
            placeholder="Search workflows, e.g. “reminders” or “invoices”"
            className="w-full rounded-xl border border-line bg-paper py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted-2 focus:border-accent focus:bg-white focus:outline-none"
          />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {selects.map((s) => (
            <div key={s.key}>
              <label htmlFor={`filter-${s.key}`} className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
                {s.label}
              </label>
              <select
                id={`filter-${s.key}`}
                value={filters[s.key]}
                onChange={(e) => setParam(s.key, e.target.value)}
                className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              >
                <option value="">All</option>
                {s.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <p className="text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? "workflow" : "workflows"}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.replace(pathname, { scroll: false });
            }}
            className="text-sm font-medium text-accent hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((w) => (
            <li key={w.slug}>
              <WorkflowCard workflow={w} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-line-strong bg-white px-6 py-14 text-center">
          <p className="font-medium text-ink">No workflows match those filters yet.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Many implementations are built to order. Describe the process you want to automate and we will tell you what is
            possible.
          </p>
          <a href="/custom-projects" className="mt-5 inline-flex text-sm font-medium text-accent hover:underline">
            Describe your process &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
