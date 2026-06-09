// Unit tests for retail-savings-quote Edge Function
// Run with: deno test supabase/functions/retail-savings-quote/index.test.ts
//
// §5 Acceptance cases from the build spec (doc id: c9e4aed6-cc8a-4552-aa85-9ed23a60619d):
//   WB2  [42,40]+2 kids  HL (excess=$500)  → annualSaving ≈ $1,028
//   WB2  [40]            HL off (nil)       → annualSaving ≈ $421
//   WB1  [38,36]+2 kids  HL off (nil)       → annualSaving ≈ $525
//
// NOTE: HL off = nil excess (no hospital excess); HL = $500 excess.
// The ~1028 figure for case WB1 is approximate (see §5 spec tolerance ±10%).
// Cases WB2[40] and WB1 family use exact tolerance ±$2.
//
// If these tests fail after seeding the §4 rate table, update BOOST_DISCOUNT
// in lib.ts to match the signed-off SC rate card values.

import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { calculateQuote } from "./lib.ts";

Deno.test("WB2 [40] nil excess → annualSaving ≈ $421 (§5 case WB2)", () => {
  const result = calculateQuote({
    plan: "wb2",
    excess: "nil",
    adults: [40],
    numChildren: 0,
  });
  if ("error" in result) throw new Error(result.error);
  assertAlmostEquals(result.annualSaving, 421, 2,
    `Expected ~421, got ${result.annualSaving}`);
});

Deno.test("WB1 [38,36]+2 kids nil excess → annualSaving ≈ $525 (§5 case WB1 family)", () => {
  const result = calculateQuote({
    plan: "wb1",
    excess: "nil",
    adults: [38, 36],
    numChildren: 2,
  });
  if ("error" in result) throw new Error(result.error);
  assertAlmostEquals(result.annualSaving, 525, 2,
    `Expected ~525, got ${result.annualSaving}`);
});

Deno.test("WB2 [42,40]+2 kids $500 excess → annualSaving within ±10% of $1,028 (§5 case WB2 family HL)", () => {
  const result = calculateQuote({
    plan: "wb2",
    excess: "500",
    adults: [42, 40],
    numChildren: 2,
  });
  if ("error" in result) throw new Error(result.error);
  const EXPECTED = 1028;
  const TOLERANCE = EXPECTED * 0.10; // 10% tolerance for approximate spec value
  const diff = Math.abs(result.annualSaving - EXPECTED);
  if (diff > TOLERANCE) {
    throw new Error(
      `annualSaving ${result.annualSaving} is outside ±10% of expected ${EXPECTED} ` +
      `(tolerance: ${TOLERANCE.toFixed(2)}). ` +
      `Update BOOST_DISCOUNT in lib.ts to match §4 spec rate table.`
    );
  }
});

Deno.test("monthlySaving = annualSaving / 12 (rounded)", () => {
  const result = calculateQuote({
    plan: "wb2",
    excess: "nil",
    adults: [40],
    numChildren: 0,
  });
  if ("error" in result) throw new Error(result.error);
  const expected = Math.round(result.annualSaving / 12 * 100) / 100;
  assertAlmostEquals(result.monthlySaving, expected, 0.01);
});

Deno.test("indicativeAnnualPremium + annualSaving ≈ retail annual (±$1)", () => {
  const result = calculateQuote({
    plan: "wb1",
    excess: "nil",
    adults: [38, 36],
    numChildren: 2,
  });
  if ("error" in result) throw new Error(result.error);
  // retailAnnual = premium + saving (within rounding)
  const total = result.indicativeAnnualPremium + result.annualSaving;
  // wb1_nil [38,36]+2kids retail monthly = 127.96+113.59+2×41.17 = 323.89
  const expectedRetailAnnual = 323.89 * 12;
  assertAlmostEquals(total, expectedRetailAnnual, 1);
});

Deno.test("validation: rejects missing adults", () => {
  const result = calculateQuote({
    plan: "wb2",
    excess: "nil",
    adults: [],
    numChildren: 0,
  });
  assertEquals("error" in result, true);
});

Deno.test("validation: rejects invalid plan", () => {
  const result = calculateQuote({
    plan: "ultracare" as "wb1",
    excess: "nil",
    adults: [40],
    numChildren: 0,
  });
  assertEquals("error" in result, true);
});
