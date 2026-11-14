"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Proposal } from "@/lib/intake/proposal";
import type { Question } from "@/lib/intake/question";
import { Icon } from "../icons";
import { cx } from "../ui";
import { ProposalView } from "./proposal-view";
import { STARTERS } from "./starters";

type Bubble =
  | { role: "user"; text: string }
  | { role: "assistant"; kind: "question"; question: Question; step: number; maxSteps: number }
  | { role: "assistant"; kind: "proposal"; revision: number };
type RawMessage = { role: "user" | "assistant"; content: unknown };
type Saved = { bubbles: Bubble[]; history: RawMessage[]; proposal: Proposal | null };
type Reply =
  | { type: "question"; question: Question; step: number; maxSteps: number }
  | { type: "proposal"; proposal: Proposal };

const GREETING = "Hi! Tell me what kind of business you run and what you’d like to fix — I’ll ask at most two quick questions, then draft your proposal.";

const storageKey = (uid: string) => `astor-intake-v2:${uid}`;
function load(uid: string): Saved | null {
  try {
    const raw = sessionStorage.getItem(storageKey(uid));
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}
function save(uid: string, s: Saved) {
  try {
    sessionStorage.setItem(storageKey(uid), JSON.stringify(s));
  } catch {
    /* storage unavailable: the chat still works for this page view */
  }
}

export function IntakeChat({
  uid,
  getToken,
  account,
  initialMessage,
}: {
  uid: string;
  getToken: () => Promise<string | null>;
  account: { name: string; email: string };
  initialMessage?: string;
}) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [history, setHistory] = useState<RawMessage[]>([]);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [input, setInput] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);

  useEffect(() => {
    const saved = initialMessage ? null : load(uid);
    if (saved) {
      setBubbles(saved.bubbles);
      setHistory(saved.history);
      setProposal(saved.proposal);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    if (ready) save(uid, { bubbles, history, proposal });
  }, [uid, bubbles, history, proposal, ready]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [bubbles, busy]);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim().slice(0, 1000);
      if (!message || busy) return;
      setError(null);
      setInput("");
      setPicked([]);
      setBusy(true);
      setBubbles((b) => [...b, { role: "user", text: message }]);
      const rollback = () => {
        setBubbles((b) => b.slice(0, -1));
        setInput(message);
      };
      try {
        const token = await getToken();
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify({ history, message }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string; messages?: RawMessage[]; reply?: Reply };
        if (!res.ok || !data.reply || !data.messages) {
          rollback();
          setError(data.error ?? "Something went wrong. Please try again.");
          return;
        }
        setHistory((h) => [...h, ...data.messages!]);
        const reply = data.reply;
        if (reply.type === "question") {
          setBubbles((b) => [...b, { role: "assistant", kind: "question", question: reply.question, step: reply.step, maxSteps: reply.maxSteps }]);
        } else {
          setProposal(reply.proposal);
          setBubbles((b) => [...b, { role: "assistant", kind: "proposal", revision: b.filter((x) => x.role === "assistant" && x.kind === "proposal").length }]);
          setTimeout(() => {
            if (window.matchMedia("(max-width: 1023px)").matches) proposalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 200);
        }
      } catch {
        rollback();
        setError("Network error. Please check your connection and try again.");
      } finally {
        setBusy(false);
      }
    },
    [busy, history, getToken],
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
    setPicked([]);
  }

  const last = bubbles[bubbles.length - 1];
  const openQuestion = !busy && last?.role === "assistant" && last.kind === "question" ? last : null;
  const draftingProposal = busy && (proposal !== null || bubbles.some((b) => b.role === "assistant" && b.kind === "question" && b.step >= b.maxSteps));
  const transcript = bubbles
    .map((b) =>
      b.role === "user"
        ? `Visitor: ${b.text}`
        : b.kind === "question"
          ? `Assistant: ${b.question.acknowledgement} ${b.question.question} [${b.question.options.join(" / ")}]`
          : "Assistant: [proposal created]",
    )
    .join("\n\n");

  return (
    <div className={cx("grid gap-8", proposal && "lg:grid-cols-[1fr_1.05fr] lg:items-start")}>
      <div className="flex h-[min(680px,calc(100vh-12rem))] min-h-[500px] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-float)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
              <Icon name="assistant" className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-mint" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Astor Systems assistant</p>
              <p className="text-xs text-muted">AI · 2 questions max, then your proposal</p>
            </div>
          </div>
          {bubbles.length > 0 && (
            <button type="button" onClick={reset} disabled={busy} className="text-xs font-medium text-accent hover:underline disabled:opacity-50">
              Start over
            </button>
          )}
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
          <AssistantBubble>{GREETING}</AssistantBubble>
          {bubbles.length === 0 && ready && !initialMessage && (
            <div className="flex flex-wrap gap-2 pt-1">
              {STARTERS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-accent/30 bg-accent-soft px-3.5 py-2 text-left text-sm text-accent-strong hover:border-accent">
                  {s}
                </button>
              ))}
            </div>
          )}
          {bubbles.map((b, i) =>
            b.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-[15px] leading-relaxed text-white">{b.text}</div>
              </div>
            ) : b.kind === "question" ? (
              <AssistantBubble key={i}>
                <span className="mb-1 block text-[11px] font-semibold text-violet">
                  Question {b.step} of {b.maxSteps} · then your proposal
                </span>
                {b.question.acknowledgement && <span className="block">{b.question.acknowledgement}</span>}
                <span className="mt-0.5 block font-semibold">{b.question.question}</span>
              </AssistantBubble>
            ) : (
              <AssistantBubble key={i}>
                <span className="flex items-center gap-1.5 font-semibold text-mint">
                  <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                  {b.revision === 0 ? "Your proposal is ready" : "Proposal updated"}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  <span className="lg:hidden">Scroll down to review it. </span>Tell me if you&rsquo;d like anything changed, or send it to our team.
                </span>
              </AssistantBubble>
            ),
          )}

          {openQuestion && (
            <div className="space-y-2 pl-1">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Answer options">
                {openQuestion.question.options.map((o) => {
                  const on = picked.includes(o);
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={openQuestion.question.multiSelect ? on : undefined}
                      onClick={() => (openQuestion.question.multiSelect ? setPicked((p) => (on ? p.filter((x) => x !== o) : [...p, o])) : send(o))}
                      className={cx(
                        "rounded-full border px-3.5 py-2 text-left text-sm transition-colors",
                        on ? "border-accent bg-accent text-white" : "border-accent/30 bg-accent-soft text-accent-strong hover:border-accent",
                      )}
                    >
                      {openQuestion.question.multiSelect && <span className="mr-1">{on ? "✓" : "+"}</span>}
                      {o}
                    </button>
                  );
                })}
              </div>
              {openQuestion.question.multiSelect && (
                <button
                  type="button"
                  disabled={picked.length === 0}
                  onClick={() => send(picked.join(", "))}
                  className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong disabled:opacity-40"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {busy && (
            <AssistantBubble>
              <span className="flex items-center gap-2 text-sm text-muted">
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-2" style={{ animationDelay: `${d * 0.2}s` }} />
                  ))}
                </span>
                {draftingProposal ? "Drafting your proposal…" : "Thinking…"}
              </span>
            </AssistantBubble>
          )}

          {error && (
            <div className="rounded-2xl border border-sun/30 bg-sun-soft px-4 py-3 text-sm text-ink" role="alert">
              {error}{" "}
              <Link href="/custom-projects" className="font-semibold text-accent underline">
                Use the project form instead
              </Link>
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
              maxLength={1000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={proposal ? "What would you like changed?" : openQuestion ? "Or type your own answer…" : "Describe your business and what you’d like to fix…"}
              className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-ink placeholder:text-muted-2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white hover:bg-accent-strong disabled:opacity-40"
            >
              <Icon name="arrow-right" className="h-5 w-5 -rotate-90" />
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] text-muted">AI assistant — a person reviews every proposal. Don&rsquo;t share passwords or payment details.</p>
        </form>
      </div>

      {proposal && (
        <div ref={proposalRef} className="scroll-mt-24 lg:sticky lg:top-24">
          <ProposalView proposal={proposal} transcript={transcript} getToken={getToken} account={account} />
        </div>
      )}
    </div>
  );
}

function AssistantBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}
