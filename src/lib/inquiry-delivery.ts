import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import type { Inquiry } from "./inquiry";
import { qualify } from "./inquiry";

export interface InquiryRecord {
  reference: string;
  received_at: string;
  kind: Inquiry["kind"];
  name: string;
  email: string;
  company: string | null;
  priority: "high" | "standard";
  signals: string[];
  payload: Omit<Inquiry, "website">;
  user_agent: string | null;
}

export function buildRecord(inquiry: Inquiry, userAgent: string | null): InquiryRecord {
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, "");
  const reference = `AS-${datePart}-${randomBytes(2).toString("hex").toUpperCase()}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website: _honeypot, ...payload } = inquiry;
  const { priority, signals } = qualify(inquiry);
  return {
    reference,
    received_at: now.toISOString(),
    kind: inquiry.kind,
    name: inquiry.name,
    email: inquiry.email,
    company: inquiry.company || null,
    priority,
    signals,
    payload,
    user_agent: userAgent,
  };
}

async function toSupabase(record: InquiryRecord) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text().catch(() => "")}`);
  return "supabase";
}

async function toWebhook(record: InquiryRecord) {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return null;
  const body = JSON.stringify(record);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.INQUIRY_WEBHOOK_SECRET;
  if (secret) headers["X-Astor-Signature"] = createHmac("sha256", secret).update(body).digest("hex");
  const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Webhook delivery failed: ${res.status}`);
  return "webhook";
}

/**
 * Delivers an inquiry to every configured destination. Succeeds if at least one
 * destination accepts it. Returns `configured: false` when no destination is set.
 */
export async function deliverInquiry(record: InquiryRecord) {
  const results = await Promise.allSettled([toSupabase(record), toWebhook(record)]);
  const delivered = results.flatMap((r) => (r.status === "fulfilled" && r.value ? [r.value] : []));
  const failures = results.flatMap((r) => (r.status === "rejected" ? [String(r.reason)] : []));
  const configured = delivered.length + failures.length > 0;
  for (const f of failures) console.error("[inquiry]", record.reference, f);
  return { configured, delivered, failures };
}
