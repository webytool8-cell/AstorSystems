"use client";

import { getApp, getApps, initializeApp } from "@firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "@firebase/auth";

/** Firebase web config. These values are public by design (they identify the project). */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(config.apiKey && config.authDomain && config.projectId);

let auth: Auth | null = null;
export function firebaseAuth(): Auth | null {
  if (!firebaseConfigured) return null;
  if (!auth) {
    const app = getApps().length ? getApp() : initializeApp(config);
    auth = getAuth(app);
    // Local development against the Firebase Auth emulator (never in production builds).
    const emulator = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
    if (emulator && process.env.NODE_ENV !== "production") connectAuthEmulator(auth, `http://${emulator}`, { disableWarnings: true });
  }
  return auth;
}
