"use client";

import { onIdTokenChanged, signOut as fbSignOut, type User } from "@firebase/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { firebaseAuth, firebaseConfigured } from "@/lib/auth/firebase-client";

interface AuthState {
  user: User | null;
  loading: boolean;
  configured: boolean;
  /** Fresh Firebase ID token for API calls (refreshed automatically by the SDK). */
  getToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  // Firebase mutates the same User object on profile changes; bump a counter to re-render.
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const auth = firebaseAuth();
    if (!auth) return;
    return onIdTokenChanged(auth, (u) => {
      setUser(u);
      setVersion((v) => v + 1);
      setLoading(false);
    });
  }, []);

  const getToken = useCallback(async () => (user ? user.getIdToken() : null), [user]);
  const signOut = useCallback(async () => {
    const auth = firebaseAuth();
    if (auth) await fbSignOut(auth);
  }, []);

  const value = useMemo(
    () => ({ user, loading, configured: firebaseConfigured, getToken, signOut }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, getToken, signOut, version],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
