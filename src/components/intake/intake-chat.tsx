"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Proposal } from "@/lib/intake/proposal";
import { Icon } from "../icons";
import { cx } from "../ui";
import { ProposalView } from "./proposal-view";
import { STARTERS } from "./starters";

type Bubble = { role: "user" | "assistant"; text: string; proposal?: boolean };
type RawMessage = { role: "user" | "assistant"; content: unknown };
type Saved = { bubbles: Bubble[]; history: RawMessage[]; proposal: Proposal | null };

const STORAGE_KEY = "astor-intake-v1";
const GREETING = "Hi! I’m the Astor Systems assistant. Tell me a little about your business and what’s slowing you down, and I’ll put together a proposal of the systems that could help.";


function load(): Saved | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}
function save(s: Saved) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable: chat still works for this page view */
  }
}

/** Minimal formatting: paragraphs and **bold**. */
function Formatted({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((para, i) => (
          <p key={i} className={i > 0 ? "mt-2" : undefined}>
            {para.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : <span key={j}>{part.replace(/\n/g, " ")}</span>,
            )}
          </p>
        ))}
    </>
  );
}

export function IntakeChat({ initialMessage }: { initialMessage?: string }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [history, setHistory] = useState<RawMessage[]>([]);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ message: string; unavailable?: boolean } | null>(null);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);

  useEffect(() => {
    // A new message from elsewhere on the site starts a fresh conversation.
    const saved = initialMessage ? null : load();
    if (saved) {
      setBubbles(saved.bubbles);
      setHistory(saved.history);
      setProposal(saved.proposal);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready) save({ bubbles, history, proposal });
  }, [bubbles, history, proposal, ready]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [bubbles]);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || busy) return;
      setError(null);
      setInput("");
      setBusy(true);
      setBubbles((b) => [...b, { role: "user", text: message }, { role: "assistant", text: "" }]);

      const appendText = (d: string) =>
        setBubbles((b) => {
          const copy = b.slice();
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, text: last.text + d };
          return copy;
        });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history, message }),
        });
        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          setBubbles((b) => b.slice(0, -2));
          setInput(message);
          setError({ message: data.error ?? "Something went wrong. Please try again.", unavailable: res.status === 503 });
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let completed = false;
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const ev = JSON.parse(line) as
              | { t: "text"; d: string }
              | { t: "break" }
              | { t: "proposal"; proposal: Proposal }
              | { t: "done"; messages: RawMessage[] }
              | { t: "error"; message: string };
            if (ev.t === "text") appendText(ev.d);
            else if (ev.t === "break") appendText("\n\n");
            else if (ev.t === "proposal") {
              setProposal(ev.proposal);
              setBubbles((b) => {
                const copy = b.slice();
                copy[copy.length - 1] = { ...copy[copy.length - 1], proposal: true };
                return copy;
              });
              setTimeout(() => {
                if (window.matchMedia("(max-width: 1023px)").matches) proposalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 300);
            } else if (ev.t === "done") {
              setHistory((h) => [...h, ...ev.messages]);
              completed = true;
            } else if (ev.t === "error") {
              setError({ message: ev.message });
            }
          }
        }
        if (!completed) {
          // Turn didn't finish: roll back so history stays consistent with the server.
          setBubbles((b) => b.slice(0, -2));
          setInput(message);
          setError((e) => e ?? { message: "The reply was interrupted. Please try again." });
        }
      } catch {
        setBubbles((b) => b.slice(0, -2));
        setInput(message);
        setError({ message: "Network error. Please check your connection and try again." });
      } finally {
        setBusy(false);
      }
    },
    [busy, history],
  );

  useEffect(() => {
    if (ready && initialMessage && !sentInitial.current && bubbles.length === 0) {
      sentInitial.current = true;
      // Drop ?q= so a reload restores the saved conversation instead of re-sending.
      window.history.replaceState(null, "", window.location.pathname);
      void send(initialMessage);
    }
  }, [ready, initialMessage, bubbles.length, send]);

  function reset() {
    setBubbles([]);
    setHistory([]);
    setProposal(null);
    setError(null);
  }

  const transcript = bubbles.map((b) => `${b.role === "user" ? "Visitor" : "Assistant"}: ${b.text}`).join("\n\n");

  return (
    <div className={cx("grid gap-8", proposal && "lg:grid-cols-[1fr_1.05fr] lg:items-start")}>
      <div className="flex h-[min(720px,calc(100vh-9rem))] min-h-[520px] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-float)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
              <Icon name="assistant" className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-mint" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Astor Systems assistant</p>
              <p className="text-xs text-muted">AI · usually replies in seconds</p>
            </div>
          </div>
          {bubbles.length > 0 && (
            <button type="button" onClick={reset} disabled={busy} className="text-xs font-medium text-accent hover:underline disabled:opacity-50">
              Start over
            </button>
          )}
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
          <div className="flex">
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink">{GREETING}</div>
          </div>
          {bubbles.length === 0 && ready && !initialMessage && (
            <div className="flex flex-wrap gap-2 pt-1">
              {STARTERS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-accent/30 bg-accent-soft px-3.5 py-2 text-left text-sm text-accent-strong hover:border-accent">
                  {s}
                </button>
              ))}
            </div>
          )}
          {bubbles.map((b, i) => (
            <div key={i} className={cx("flex", b.role === "user" && "justify-end")}>
              <div
                className={cx(
                  "max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                  b.role === "user" ? "rounded-br-md bg-accent text-white" : "rounded-bl-md bg-paper text-ink",
                )}
              >
                {b.text ? (
                  <Formatted text={b.text} />
                ) : (
                  <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-2" style={{ animationDelay: `${d * 0.2}s` }} />
                    ))}
                  </span>
                )}
                {b.proposal && (
                  <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-mint">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} /> Proposal created
                    <span className="lg:hidden">— see below</span>
                  </span>
                )}
              </div>
            </div>
          ))}
          {error && (
            <div className="rounded-2xl border border-sun/30 bg-sun-soft px-4 py-3 text-sm text-ink" role="alert">
              {error.message}
              {error.unavailable && (
                <>
                  {" "}
                  You can still{" "}
                  <Link href="/custom-projects" className="font-semibold text-accent underline">
                    describe your project here
                  </Link>
                  .
                </>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="border-t border-line p-3"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-line bg-paper/50 p-2 focus-within:border-accent">
            <label htmlFor="intake-input" className="sr-only">
              Message
            </label>
            <textarea
              id="intake-input"
              rows={1}
              value={input}
              maxLength={2000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={proposal ? "Ask for changes, or ask a question…" : "Describe your business or what you’d like to fix…"}
              className="max-h-36 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-ink placeholder:text-muted-2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-opacity hover:bg-accent-strong disabled:opacity-40"
            >
              <Icon name="arrow-right" className="h-5 w-5 -rotate-90" />
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] text-muted">
            AI assistant — it can make mistakes, and a person reviews every proposal. Don&rsquo;t share passwords or payment details.
          </p>
        </form>
      </div>

      {proposal && (
        <div ref={proposalRef} className="scroll-mt-24 lg:sticky lg:top-24">
          <ProposalView proposal={proposal} transcript={transcript} />
        </div>
      )}
    </div>
  );
}
