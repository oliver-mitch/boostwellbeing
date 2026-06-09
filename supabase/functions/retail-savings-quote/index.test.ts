// Unit tests for retail-savings-quote — pure calculation logic (lib.ts).
// Run with: deno test supabase/functions/retail-savings-quote/index.test.ts
//
// §5 Acceptance cases from the build spec (doc id: c9e4aed6-cc8a-4552-aa85-9ed23a60619d):
//   WB2  adults [42,40]  kids 2  HL on   → annualSaving ≈ 1028, indicativeAnnualPremium ≈ 6585
//   WB2  adults [40]     kids 0  HL off  → annualSaving = 421
//   WB1  adults [38,36]  kids 2  HL off  → annualSaving = 525
//
// The saving is the Nil-excess − $500-excess premium difference on the SAME plan
// (build spec §3); Healthy Lifestyle applies a 0.9 multiplier to adults only;
// only the first two children are rated.

import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { calculateQuote, type QuoteResult } from "./lib.ts";

function quote(req: Parameters<typeof calculateQuote>[0]): QuoteResult {
  const result = calculateQuote(req);
  if ("error" in result) throw new Error(`Unexpected error: ${result.error}`);
  return result;
}

// ── §5 acceptance cases ───────────────────────────────────────────────────────

Deno.test("§5 — WB2 [42,40] + 2 kids, HL on → saving ≈ 1028, premium ≈ 6585", () => {
  const r = quote({ plan: "WB2", adults: [42, 40], kids: 2, healthyLifestyle: true });
  assertAlmostEquals(r.annualSaving, 1028, 1, `Expected ≈1028, got ${r.annualSaving}`);
  assertAlmostEquals(r.indicativeAnnualPremium, 6585, 1, `Expected ≈6585, got ${r.indicativeAnnualPremium}`);
});

Deno.test("§5 — WB2 [40], no kids, HL off → saving = 421", () => {
  const r = quote({ plan: "WB2", adults: [40], kids: 0, healthyLifestyle: false });
  assertAlmostEquals(r.annualSaving, 421, 1, `Expected ≈421, got ${r.annualSaving}`);
});

Deno.test("§5 — WB1 [38,36] + 2 kids, HL off → saving = 525", () => {
  const r = quote({ plan: "WB1", adults: [38, 36], kids: 2, healthyLifestyle: false });
  assertAlmostEquals(r.annualSaving, 525, 1, `Expected ≈525, got ${r.annualSaving}`);
});

// ── Rule coverage (build spec §3) ─────────────────────────────────────────────

Deno.test("monthlySaving = annualSaving / 12", () => {
  const r = quote({ plan: "WB2", adults: [40], kids: 0, healthyLifestyle: false });
  assertAlmostEquals(r.monthlySaving, r.annualSaving / 12, 0.01);
});

Deno.test("only the first two children are rated (3rd+ adds nothing)", () => {
  const two = quote({ plan: "WB2", adults: [40], kids: 2, healthyLifestyle: false });
  const four = quote({ plan: "WB2", adults: [40], kids: 4, healthyLifestyle: false });
  assertEquals(four.annualSaving, two.annualSaving);
  assertEquals(four.indicativeAnnualPremium, two.indicativeAnnualPremium);
});

Deno.test("Healthy Lifestyle applies 0.9 to adults only", () => {
  // WB2 [40] no kids: $500 = 2698.52, Nil = 3119.68.
  // HL off saving = 421.16; HL on saving = 0.9 × 421.16 = 379.04 (kids unaffected here).
  const off = quote({ plan: "WB2", adults: [40], kids: 0, healthyLifestyle: false });
  const on = quote({ plan: "WB2", adults: [40], kids: 0, healthyLifestyle: true });
  assertAlmostEquals(on.annualSaving, off.annualSaving * 0.9, 0.5);
});

Deno.test("adult age clamps to 21–70", () => {
  const young = quote({ plan: "WB1", adults: [10], kids: 0, healthyLifestyle: false });
  const at21 = quote({ plan: "WB1", adults: [21], kids: 0, healthyLifestyle: false });
  assertEquals(young.annualSaving, at21.annualSaving);

  const old = quote({ plan: "WB1", adults: [99], kids: 0, healthyLifestyle: false });
  const at70 = quote({ plan: "WB1", adults: [70], kids: 0, healthyLifestyle: false });
  assertEquals(old.annualSaving, at70.annualSaving);
});

// ── Validation ────────────────────────────────────────────────────────────────

Deno.test("validation: rejects empty adults", () => {
  const r = calculateQuote({ plan: "WB2", adults: [], kids: 0, healthyLifestyle: false });
  assertEquals("error" in r, true);
});

Deno.test("validation: rejects more than two adults", () => {
  const r = calculateQuote({ plan: "WB2", adults: [40, 41, 42], kids: 0, healthyLifestyle: false });
  assertEquals("error" in r, true);
});

Deno.test("validation: rejects invalid plan", () => {
  // deno-lint-ignore no-explicit-any
  const r = calculateQuote({ plan: "WB3" as any, adults: [40], kids: 0, healthyLifestyle: false });
  assertEquals("error" in r, true);
});
