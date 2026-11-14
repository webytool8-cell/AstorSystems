"use client";

import Link from "next/link";
import { AuthProvider, useAuth } from "../auth/auth-provider";
import { SignInCard } from "../auth/sign-in-card";
import { IntakeChat } from "./intake-chat";

/** Signed-in gate around the AI intake chat. Firebase only loads on this page. */
export function IntakeExperience({ initialMessage }: { initialMessage?: string }) {
  return (
    <AuthProvider>
      <Gate initialMessage={initialMessage} />
    </AuthProvider>
  );
}

function Gate({ initialMessage }: { initialMessage?: string }) {
  const { user, loading, configured, getToken, signOut } = useAuth();

  if (!configured) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <p className="font-semibold text-ink">The assistant is almost ready.</p>
        <p className="mt-2 text-sm text-muted">Account sign-in is being set up. In the meantime, describe your project and we&rsquo;ll reply within two business days.</p>
        <Link href="/custom-projects" className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
          Describe your project
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="mx-auto h-96 max-w-md animate-pulse-soft rounded-3xl border border-line bg-white" aria-label="Loading" />;
  }

  if (!user) return <SignInCard pendingMessage={initialMessage} />;

  const name = user.displayName ?? "";
  const email = user.email ?? "";
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3 text-sm text-muted">
        <span>
          Signed in as <span className="font-medium text-ink">{email || name || "your account"}</span>
        </span>
        <button type="button" onClick={() => void signOut()} className="font-medium text-accent hover:underline">
          Sign out
        </button>
      </div>
      <IntakeChat uid={user.uid} getToken={getToken} account={{ name, email }} initialMessage={initialMessage} />
    </div>
  );
}
