import "server-only";
import { createRemoteJWKSet, decodeJwt, jwtVerify, type JWTPayload } from "jose";

/**
 * Verifies a Firebase Authentication ID token without the Admin SDK, following
 * Firebase's guidance for third-party JWT libraries: RS256, signed by Google's
 * securetoken keys, issuer/audience bound to the project, `sub` = the user's uid.
 */
const GOOGLE_JWKS = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

function projectId() {
  return process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
function keySet() {
  // Local testing only: point verification at a test key set. Ignored in production.
  const override = process.env.NODE_ENV !== "production" ? process.env.FIREBASE_TEST_JWKS_URL : undefined;
  jwks ??= createRemoteJWKSet(new URL(override || GOOGLE_JWKS));
  return jwks;
}

export interface VerifiedUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  name: string | null;
}

export function authConfigured() {
  return Boolean(projectId());
}

export async function verifyIdToken(token: string): Promise<VerifiedUser | null> {
  const project = projectId();
  if (!project || !token) return null;
  try {
    let payload: JWTPayload;
    if (process.env.FIREBASE_AUTH_EMULATOR_HOST && process.env.NODE_ENV !== "production") {
      // The local Auth emulator issues unsigned tokens; accept them only outside production.
      payload = decodeJwt(token);
      if (payload.aud !== project || payload.iss !== `https://securetoken.google.com/${project}`) return null;
    } else {
      ({ payload } = await jwtVerify(token, keySet(), {
        algorithms: ["RS256"],
        issuer: `https://securetoken.google.com/${project}`,
        audience: project,
      }));
    }
    if (typeof payload.sub !== "string" || payload.sub.length === 0 || payload.sub.length > 128) return null;
    const authTime = typeof payload.auth_time === "number" ? payload.auth_time : 0;
    if (authTime * 1000 > Date.now() + 60_000) return null;
    return {
      uid: payload.sub,
      email: typeof payload.email === "string" ? payload.email : null,
      emailVerified: payload.email_verified === true,
      name: typeof payload.name === "string" ? payload.name : null,
    };
  } catch {
    return null;
  }
}

/** Reads `Authorization: Bearer <Firebase ID token>` and verifies it. */
export async function userFromRequest(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match ? verifyIdToken(match[1].trim()) : null;
}
