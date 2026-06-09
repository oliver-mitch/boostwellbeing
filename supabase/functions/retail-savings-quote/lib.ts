// ─────────────────────────────────────────────────────────────────────────────
// Retail Savings Quote — pure calculation logic
// ─────────────────────────────────────────────────────────────────────────────
//
// SOURCE: Southern Cross Individual Rate Card, effective 01 January 2026
// These are retail (direct-purchase) monthly premiums in NZD.
// Boost's group scheme delivers approximately 13.5% off retail for all members.
//
// ⚠️  This file is server-side only — never imported by client code.
//     The full per-line rate table must not reach the browser.
// ─────────────────────────────────────────────────────────────────────────────

export interface AgeRate {
  from: number;
  to: number;
  rate: number;
}

export type PlanCode = "wb1" | "wb2";
export type ExcessCode = "nil" | "500";

export interface QuoteRequest {
  plan: PlanCode;
  excess: ExcessCode;
  adults: number[];      // ages, 1–2 entries, 18–73
  numChildren: number;   // 0–8
}

export interface QuoteResult {
  annualSaving: number;
  monthlySaving: number;
  indicativeAnnualPremium: number;
}

// Group discount Boost negotiates vs SC retail direct
const BOOST_DISCOUNT = 0.135;

// ─── Rate tables ──────────────────────────────────────────────────────────────
// Each entry: [ageFrom, ageTo, monthlyRate]
// Source: STANDARD_PLANS from rateData.ts (SC individual/retail rates)

const WB1_NIL: AgeRate[] = [
  { from: 0, to: 20, rate: 41.17 },
  { from: 21, to: 21, rate: 93.88 },
  { from: 22, to: 22, rate: 96.85 },
  { from: 23, to: 23, rate: 99.30 },
  { from: 24, to: 24, rate: 99.39 },
  { from: 25, to: 25, rate: 99.51 },
  { from: 26, to: 26, rate: 99.60 },
  { from: 27, to: 27, rate: 100.15 },
  { from: 28, to: 28, rate: 100.23 },
  { from: 29, to: 29, rate: 100.26 },
  { from: 30, to: 30, rate: 100.27 },
  { from: 31, to: 31, rate: 100.32 },
  { from: 32, to: 32, rate: 100.38 },
  { from: 33, to: 33, rate: 100.44 },
  { from: 34, to: 34, rate: 102.69 },
  { from: 35, to: 35, rate: 106.69 },
  { from: 36, to: 36, rate: 113.59 },
  { from: 37, to: 37, rate: 120.08 },
  { from: 38, to: 38, rate: 127.96 },
  { from: 39, to: 39, rate: 133.54 },
  { from: 40, to: 40, rate: 138.40 },
  { from: 41, to: 41, rate: 149.91 },
  { from: 42, to: 42, rate: 157.31 },
  { from: 43, to: 43, rate: 164.89 },
  { from: 44, to: 44, rate: 173.31 },
  { from: 45, to: 45, rate: 181.69 },
  { from: 46, to: 46, rate: 189.43 },
  { from: 47, to: 47, rate: 196.78 },
  { from: 48, to: 48, rate: 204.03 },
  { from: 49, to: 49, rate: 210.92 },
  { from: 50, to: 50, rate: 215.48 },
  { from: 51, to: 51, rate: 219.73 },
  { from: 52, to: 52, rate: 224.56 },
  { from: 53, to: 53, rate: 231.00 },
  { from: 54, to: 54, rate: 243.50 },
  { from: 55, to: 55, rate: 258.02 },
  { from: 56, to: 56, rate: 272.70 },
  { from: 57, to: 57, rate: 287.06 },
  { from: 58, to: 58, rate: 301.57 },
  { from: 59, to: 59, rate: 325.18 },
  { from: 60, to: 60, rate: 353.60 },
  { from: 61, to: 61, rate: 377.28 },
  { from: 62, to: 62, rate: 401.31 },
  { from: 63, to: 63, rate: 425.68 },
  { from: 64, to: 64, rate: 460.94 },
  { from: 65, to: 65, rate: 497.58 },
  { from: 66, to: 66, rate: 534.70 },
  { from: 67, to: 67, rate: 572.72 },
  { from: 68, to: 68, rate: 611.74 },
  { from: 69, to: 69, rate: 637.35 },
  { from: 70, to: 70, rate: 658.29 },
  { from: 71, to: 71, rate: 679.08 },
  { from: 72, to: 72, rate: 699.46 },
  { from: 73, to: 73, rate: 729.79 },
  { from: 74, to: 999, rate: 654.78 },
];

const WB1_500: AgeRate[] = [
  { from: 0, to: 20, rate: 35.61 },
  { from: 21, to: 21, rate: 81.21 },
  { from: 22, to: 22, rate: 83.77 },
  { from: 23, to: 23, rate: 85.89 },
  { from: 24, to: 24, rate: 85.97 },
  { from: 25, to: 25, rate: 86.07 },
  { from: 26, to: 26, rate: 86.15 },
  { from: 27, to: 27, rate: 86.63 },
  { from: 28, to: 28, rate: 86.70 },
  { from: 29, to: 29, rate: 86.72 },
  { from: 30, to: 30, rate: 86.74 },
  { from: 31, to: 31, rate: 86.78 },
  { from: 32, to: 32, rate: 86.83 },
  { from: 33, to: 33, rate: 86.88 },
  { from: 34, to: 34, rate: 88.82 },
  { from: 35, to: 35, rate: 92.29 },
  { from: 36, to: 36, rate: 98.26 },
  { from: 37, to: 37, rate: 103.87 },
  { from: 38, to: 38, rate: 110.69 },
  { from: 39, to: 39, rate: 115.51 },
  { from: 40, to: 40, rate: 119.72 },
  { from: 41, to: 41, rate: 129.67 },
  { from: 42, to: 42, rate: 136.07 },
  { from: 43, to: 43, rate: 142.63 },
  { from: 44, to: 44, rate: 149.91 },
  { from: 45, to: 45, rate: 157.16 },
  { from: 46, to: 46, rate: 163.86 },
  { from: 47, to: 47, rate: 170.22 },
  { from: 48, to: 48, rate: 176.49 },
  { from: 49, to: 49, rate: 182.45 },
  { from: 50, to: 50, rate: 186.39 },
  { from: 51, to: 51, rate: 190.07 },
  { from: 52, to: 52, rate: 194.24 },
  { from: 53, to: 53, rate: 199.81 },
  { from: 54, to: 54, rate: 210.62 },
  { from: 55, to: 55, rate: 223.18 },
  { from: 56, to: 56, rate: 235.88 },
  { from: 57, to: 57, rate: 248.30 },
  { from: 58, to: 58, rate: 260.86 },
  { from: 59, to: 59, rate: 281.28 },
  { from: 60, to: 60, rate: 305.87 },
  { from: 61, to: 61, rate: 326.35 },
  { from: 62, to: 62, rate: 347.13 },
  { from: 63, to: 63, rate: 368.21 },
  { from: 64, to: 64, rate: 398.71 },
  { from: 65, to: 65, rate: 430.41 },
  { from: 66, to: 66, rate: 462.51 },
  { from: 67, to: 67, rate: 495.41 },
  { from: 68, to: 68, rate: 529.16 },
  { from: 69, to: 69, rate: 551.31 },
  { from: 70, to: 70, rate: 569.42 },
  { from: 71, to: 71, rate: 587.40 },
  { from: 72, to: 72, rate: 605.03 },
  { from: 73, to: 73, rate: 631.27 },
  { from: 74, to: 999, rate: 566.38 },
];

const WB2_NIL: AgeRate[] = [
  { from: 0, to: 20, rate: 74.91 },
  { from: 21, to: 21, rate: 153.25 },
  { from: 22, to: 22, rate: 160.98 },
  { from: 23, to: 23, rate: 172.59 },
  { from: 24, to: 24, rate: 173.68 },
  { from: 25, to: 25, rate: 174.99 },
  { from: 26, to: 26, rate: 175.97 },
  { from: 27, to: 27, rate: 176.77 },
  { from: 28, to: 28, rate: 178.12 },
  { from: 29, to: 29, rate: 180.39 },
  { from: 30, to: 30, rate: 182.39 },
  { from: 31, to: 31, rate: 186.14 },
  { from: 32, to: 32, rate: 188.00 },
  { from: 33, to: 33, rate: 190.33 },
  { from: 34, to: 34, rate: 200.44 },
  { from: 35, to: 35, rate: 207.28 },
  { from: 36, to: 36, rate: 218.92 },
  { from: 37, to: 37, rate: 232.82 },
  { from: 38, to: 38, rate: 244.27 },
  { from: 39, to: 39, rate: 252.01 },
  { from: 40, to: 40, rate: 259.97 },
  { from: 41, to: 41, rate: 270.40 },
  { from: 42, to: 42, rate: 278.43 },
  { from: 43, to: 43, rate: 286.46 },
  { from: 44, to: 44, rate: 301.79 },
  { from: 45, to: 45, rate: 316.92 },
  { from: 46, to: 46, rate: 332.45 },
  { from: 47, to: 47, rate: 347.62 },
  { from: 48, to: 48, rate: 359.40 },
  { from: 49, to: 49, rate: 369.85 },
  { from: 50, to: 50, rate: 376.60 },
  { from: 51, to: 51, rate: 379.88 },
  { from: 52, to: 52, rate: 386.55 },
  { from: 53, to: 53, rate: 395.87 },
  { from: 54, to: 54, rate: 414.03 },
  { from: 55, to: 55, rate: 434.85 },
  { from: 56, to: 56, rate: 455.66 },
  { from: 57, to: 57, rate: 476.49 },
  { from: 58, to: 58, rate: 497.31 },
  { from: 59, to: 59, rate: 529.29 },
  { from: 60, to: 60, rate: 570.90 },
  { from: 61, to: 61, rate: 597.80 },
  { from: 62, to: 62, rate: 630.01 },
  { from: 63, to: 63, rate: 662.23 },
  { from: 64, to: 64, rate: 705.37 },
  { from: 65, to: 65, rate: 749.38 },
  { from: 66, to: 66, rate: 792.76 },
  { from: 67, to: 67, rate: 848.63 },
  { from: 68, to: 68, rate: 904.00 },
  { from: 69, to: 69, rate: 953.23 },
  { from: 70, to: 70, rate: 980.76 },
  { from: 71, to: 71, rate: 1003.81 },
  { from: 72, to: 72, rate: 1020.56 },
  { from: 73, to: 73, rate: 1023.30 },
  { from: 74, to: 999, rate: 976.50 },
];

const WB2_500: AgeRate[] = [
  { from: 0, to: 20, rate: 64.80 },
  { from: 21, to: 21, rate: 132.57 },
  { from: 22, to: 22, rate: 139.25 },
  { from: 23, to: 23, rate: 149.29 },
  { from: 24, to: 24, rate: 150.23 },
  { from: 25, to: 25, rate: 151.37 },
  { from: 26, to: 26, rate: 152.21 },
  { from: 27, to: 27, rate: 152.90 },
  { from: 28, to: 28, rate: 154.08 },
  { from: 29, to: 29, rate: 156.04 },
  { from: 30, to: 30, rate: 157.76 },
  { from: 31, to: 31, rate: 161.01 },
  { from: 32, to: 32, rate: 162.62 },
  { from: 33, to: 33, rate: 164.63 },
  { from: 34, to: 34, rate: 173.38 },
  { from: 35, to: 35, rate: 179.30 },
  { from: 36, to: 36, rate: 189.36 },
  { from: 37, to: 37, rate: 201.39 },
  { from: 38, to: 38, rate: 211.29 },
  { from: 39, to: 39, rate: 217.99 },
  { from: 40, to: 40, rate: 224.88 },
  { from: 41, to: 41, rate: 233.90 },
  { from: 42, to: 42, rate: 240.84 },
  { from: 43, to: 43, rate: 247.78 },
  { from: 44, to: 44, rate: 261.04 },
  { from: 45, to: 45, rate: 274.14 },
  { from: 46, to: 46, rate: 287.57 },
  { from: 47, to: 47, rate: 300.69 },
  { from: 48, to: 48, rate: 310.88 },
  { from: 49, to: 49, rate: 319.92 },
  { from: 50, to: 50, rate: 325.76 },
  { from: 51, to: 51, rate: 328.60 },
  { from: 52, to: 52, rate: 334.36 },
  { from: 53, to: 53, rate: 342.42 },
  { from: 54, to: 54, rate: 358.14 },
  { from: 55, to: 55, rate: 376.14 },
  { from: 56, to: 56, rate: 394.15 },
  { from: 57, to: 57, rate: 412.16 },
  { from: 58, to: 58, rate: 430.17 },
  { from: 59, to: 59, rate: 457.84 },
  { from: 60, to: 60, rate: 493.83 },
  { from: 61, to: 61, rate: 517.10 },
  { from: 62, to: 62, rate: 544.96 },
  { from: 63, to: 63, rate: 572.83 },
  { from: 64, to: 64, rate: 610.15 },
  { from: 65, to: 65, rate: 648.22 },
  { from: 66, to: 66, rate: 685.74 },
  { from: 67, to: 67, rate: 734.06 },
  { from: 68, to: 68, rate: 781.96 },
  { from: 69, to: 69, rate: 824.54 },
  { from: 70, to: 70, rate: 848.36 },
  { from: 71, to: 71, rate: 868.30 },
  { from: 72, to: 72, rate: 882.79 },
  { from: 73, to: 73, rate: 885.15 },
  { from: 74, to: 999, rate: 844.67 },
];

const RATE_TABLES: Record<string, AgeRate[]> = {
  wb1_nil: WB1_NIL,
  wb1_500: WB1_500,
  wb2_nil: WB2_NIL,
  wb2_500: WB2_500,
};

function getRateForAge(rates: AgeRate[], age: number): number {
  const band = rates.find((r) => age >= r.from && age <= r.to);
  return band ? band.rate : 0;
}

export function calculateQuote(req: QuoteRequest): QuoteResult | { error: string } {
  const { plan, excess, adults, numChildren } = req;

  if (!["wb1", "wb2"].includes(plan)) {
    return { error: "Invalid plan. Must be wb1 or wb2." };
  }
  if (!["nil", "500"].includes(excess)) {
    return { error: "Invalid excess. Must be nil or 500." };
  }
  if (!Array.isArray(adults) || adults.length < 1 || adults.length > 2) {
    return { error: "adults must be an array of 1 or 2 ages." };
  }
  for (const age of adults) {
    if (typeof age !== "number" || age < 18 || age > 80) {
      return { error: "Each adult age must be a number between 18 and 80." };
    }
  }
  if (typeof numChildren !== "number" || numChildren < 0 || numChildren > 8) {
    return { error: "numChildren must be a number between 0 and 8." };
  }

  const key = `${plan}_${excess}`;
  const rates = RATE_TABLES[key];
  if (!rates) return { error: "Rate table not found." };

  const CHILD_AGE = 10; // representative child age (0–20 band)

  let totalMonthly = 0;
  for (const age of adults) {
    totalMonthly += getRateForAge(rates, age);
  }
  totalMonthly += numChildren * getRateForAge(rates, CHILD_AGE);

  const retailAnnual = totalMonthly * 12;
  const annualSaving = Math.round(retailAnnual * BOOST_DISCOUNT * 100) / 100;
  const monthlySaving = Math.round(annualSaving / 12 * 100) / 100;
  const indicativeAnnualPremium = Math.round((retailAnnual - annualSaving) * 100) / 100;

  return { annualSaving, monthlySaving, indicativeAnnualPremium };
}
