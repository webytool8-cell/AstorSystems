"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { firebaseAuth } from "@/lib/auth/firebase-client";
import { Icon } from "../icons";
import { cx } from "../ui";

function friendlyError(code: string) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password don’t match. Try again or reset your password.";
    case "auth/email-already-in-use":
      return "An account already exists for that email. Sign in instead.";
    case "auth/weak-password":
      return "Please use a password with at least 8 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in window. Allow pop-ups for this site and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return "Sign-in didn’t work. Please try again.";
  }
}

export function SignInCard({ pendingMessage }: { pendingMessage?: string }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");

  const code = (e: unknown) => (typeof e === "object" && e && "code" in e ? String((e as { code: unknown }).code) : "");

  async function withGoogle() {
    const auth = firebaseAuth();
    if (!auth) return;
    setError("");
    setBusy(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      setError(friendlyError(code(e)));
    } finally {
      setBusy(false);
    }
  }

  async function withEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const auth = firebaseAuth();
    if (!auth) return;
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const name = String(fd.get("name") ?? "").trim();
    setError("");
    setNotice("");
    if (mode === "signup" && password.length < 8) {
      setError("Please use a password with at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(cred.user, { displayName: name });
          await cred.user.getIdToken(true); // notify listeners so the new name shows up
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(friendlyError(code(err)));
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    const auth = firebaseAuth();
    if (!auth) return;
    if (!email) {
      setError("Enter your email above, then choose “Forgot password”.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("");
      setNotice("If an account exists for that email, a reset link is on its way.");
    } catch (err) {
      setError(friendlyError(code(err)));
    }
  }

  const input = "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none";

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-float)] sm:p-8">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon name="assistant" className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-ink">{mode === "signin" ? "Sign in to get your proposal" : "Create your free account"}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        An account lets you come back to your proposal and lets our team follow up with you.
      </p>
      {pendingMessage && (
        <p className="mt-4 rounded-xl bg-paper px-3.5 py-2.5 text-sm text-ink">
          <span className="text-muted">Your message: </span>&ldquo;{pendingMessage.slice(0, 160)}
          {pendingMessage.length > 160 ? "…" : ""}&rdquo;
        </p>
      )}

      <button
        type="button"
        onClick={withGoogle}
        disabled={busy}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40 disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7Z" />
          <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8h-4v3.1A12 12 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
          <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
        </svg>
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-2">
        <span className="h-px flex-1 bg-line" /> or use email <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={withEmail} className="space-y-3" noValidate>
        {mode === "signup" && (
          <div>
            <label htmlFor="auth-name" className="text-xs font-medium text-ink">
              Your name
            </label>
            <input id="auth-name" name="name" autoComplete="name" className={input} />
          </div>
        )}
        <div>
          <label htmlFor="auth-email" className="text-xs font-medium text-ink">
            Email
          </label>
          <input id="auth-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={input} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="auth-password" className="text-xs font-medium text-ink">
              Password
            </label>
            {mode === "signin" && (
              <button type="button" onClick={reset} className="text-xs text-accent hover:underline">
                Forgot password?
              </button>
            )}
          </div>
          <input id="auth-password" name="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} required className={input} />
        </div>
        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="text-sm text-mint" role="status">
            {notice}
          </p>
        )}
        <button type="submit" disabled={busy} className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong disabled:opacity-60">
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        {mode === "signin" ? "New here? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
            setNotice("");
          }}
          className={cx("font-semibold text-accent hover:underline")}
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
        By continuing you agree to our{" "}
        <Link href="/privacy" className="underline">
          privacy notice
        </Link>
        . Prefer not to sign in?{" "}
        <Link href="/custom-projects" className="underline">
          Use the project form
        </Link>
        .
      </p>
    </div>
  );
}
