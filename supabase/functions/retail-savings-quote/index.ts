// Supabase Edge Function: retail-savings-quote
// Returns Southern Cross retail savings for a given family configuration.
// Rate table is embedded here — never sent to the client.
//
// TODO (§8): Update BOOST_DISCOUNT after Southern Cross sign-off on rate card.
// TODO (§8): Add IP-based rate limiting via Upstash once function is signed off.

import { calculateQuote } from "./lib.ts";

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

  const { plan, excess, adults, numChildren } = body as Record<string, unknown>;

  const result = calculateQuote({
    plan: plan as "wb1" | "wb2",
    excess: excess as "nil" | "500",
    adults: adults as number[],
    numChildren: numChildren as number,
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
