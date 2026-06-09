// Supabase Edge Function: retail-savings-quote
// Returns the Nil-vs-$500-excess saving on a Southern Cross plan for a given
// family configuration. The rate table lives in lib.ts (server-side) and is
// never sent to the client — only { annualSaving, monthlySaving,
// indicativeAnnualPremium } is returned (build spec §2).
//
// TODO (§8): Refresh the SC rate card in lib.ts after 1 July 2026.
// TODO (§8): Add IP-based rate limiting via Upstash once function is signed off.

import { calculateQuote, type PlanCode } from "./lib.ts";

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    !origin ||
    origin === "https://www.boostwellbeing.co.nz" ||
    origin === "https://boostwellbeing.co.nz" ||
    origin.startsWith("https://boostwellbeing-") ||  // Vercel preview URLs
    origin.startsWith("http://localhost");

  return {
    "Access-Control-Allow-Origin": allowed ? (origin ?? "*") : "https://www.boostwellbeing.co.nz",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

// Simple per-instance in-memory rate limiter (resets on cold start)
const REQUEST_COUNTS = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;       // requests per window
const WINDOW_MS = 60_000;    // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = REQUEST_COUNTS.get(ip);
  if (!entry || now > entry.resetAt) {
    REQUEST_COUNTS.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { plan, adults, kids, healthyLifestyle } = body as Record<string, unknown>;

  const result = calculateQuote({
    plan: plan as PlanCode,
    adults: adults as number[],
    kids: kids as number,
    healthyLifestyle: healthyLifestyle as boolean,
  });

  if ("error" in result) {
    return new Response(JSON.stringify(result), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
