import { NextResponse } from "next/server";
import { fieldErrors, inquirySchema } from "@/lib/inquiry";
import { buildRecord, deliverInquiry } from "@/lib/inquiry-delivery";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/** Best-effort per-instance rate limit. Use an edge/WAF limit in production for stronger protection. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    // Honeypot tripped: respond as if successful so bots learn nothing.
    if (errors.website) return NextResponse.json({ ok: true, reference: "AS-RECEIVED" });
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors: errors }, { status: 422 });
  }

  const record = buildRecord(parsed.data, request.headers.get("user-agent"));
  const result = await deliverInquiry(record);

  if (!result.configured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] No destination configured; logging inquiry (development only):", JSON.stringify(record, null, 2));
      return NextResponse.json({ ok: true, reference: record.reference, stored: false });
    }
    console.error("[inquiry] No inquiry destination configured in production.");
    return NextResponse.json(
      { ok: false, error: `Our inquiry form is temporarily unavailable. Please email us at ${site.email}.` },
      { status: 503 },
    );
  }

  if (result.delivered.length === 0) {
    return NextResponse.json(
      { ok: false, error: `We could not submit your inquiry. Please try again or email us at ${site.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference: record.reference });
}
