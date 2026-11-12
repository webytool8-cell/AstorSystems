"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../icons";
import { STARTERS } from "./starters";

/** Homepage entry point: the visitor's first message opens the full intake chat. */
export function HeroChatInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const go = (text: string) => {
    const q = text.trim();
    router.push(q ? `/start?q=${encodeURIComponent(q)}` : "/start");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        className="rounded-2xl border border-line bg-white p-2 shadow-[var(--shadow-lift)] focus-within:border-accent"
      >
        <label htmlFor="hero-chat" className="sr-only">
          Describe what you&rsquo;d like to improve
        </label>
        <div className="flex items-center gap-2">
          <span className="ml-2 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent sm:flex">
            <Icon name="assistant" className="h-4 w-4" />
          </span>
          <input
            id="hero-chat"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={2000}
            placeholder="What’s slowing your business down?"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-ink placeholder:text-muted-2 focus:outline-none"
          />
          <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-strong">
            <span className="hidden sm:inline">Get my proposal</span>
            <Icon name="arrow-right" className="h-4 w-4" />
          </button>
        </div>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {STARTERS.slice(0, 3).map((s) => (
          <button key={s} type="button" onClick={() => go(s)} className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-left text-xs text-ink hover:border-accent hover:text-accent">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
