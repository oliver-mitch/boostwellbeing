// ─────────────────────────────────────────────────────────────────────────────
// Retail Savings Quote — pure calculation logic
// ─────────────────────────────────────────────────────────────────────────────
//
// SOURCE: Southern Cross Individual Rate Card (KB doc 908dca90-1f0e-4d15-947a-605685412afc).
//   Annual premiums, direct-debit (2.5% discount already baked in), GST-inclusive.
//   Format per age: [ $500-excess, Nil-excess ].
//   ⚠️ Effective to 30 June 2026 — refresh from the new SC rate card after 1 July.
//
// MODEL (build spec §3): the saving is the premium difference between the
//   Nil-excess and the $500-excess version of the SAME Southern Cross plan.
//   The customer takes the cheaper $500-excess plan; BoostWellbeing (with Risk
//   Solutions Ltd) reimburses the $500 excess on the first eligible claim each
//   policy year. This is NOT a cross-insurer switch and NOT a group discount.
//
// ⚠️  Server-side only — never imported by client code. The full per-line rate
//     table must not reach the browser (build spec §2).
// ─────────────────────────────────────────────────────────────────────────────

export type PlanCode = "WB1" | "WB2";

export interface QuoteRequest {
  plan: PlanCode;
  adults: number[];          // ages, 1–2 entries (clamped to 21–70)
  kids: number;              // children under 21 (only first two are rated)
  healthyLifestyle: boolean; // adults 21+ get a 10% Healthy Lifestyle Reward
}

export interface QuoteResult {
  annualSaving: number;
  monthlySaving: number;
  indicativeAnnualPremium: number;
}

// Each tuple is [ $500-excess annual premium, Nil-excess annual premium ].
type RateTuple = [number, number];

interface PlanRates {
  child: RateTuple;
  adult: Record<number, RateTuple>;
}

const SC_RATES: Record<PlanCode, PlanRates> = {
  WB2: {
    child: [777.60, 898.96],
    adult: {
      21: [1590.79, 1839.06], 22: [1670.98, 1931.77], 23: [1791.45, 2071.04], 24: [1802.77, 2084.13], 25: [1816.44, 2099.93],
      26: [1826.56, 2111.63], 27: [1834.86, 2121.22], 28: [1848.93, 2137.49], 29: [1872.44, 2164.67], 30: [1893.17, 2188.63],
      31: [1932.15, 2233.70], 32: [1951.44, 2256.00], 33: [1975.60, 2283.94], 34: [2080.61, 2405.34], 35: [2151.60, 2487.40],
      36: [2272.36, 2627.01], 37: [2416.63, 2793.79], 38: [2535.53, 2931.25], 39: [2615.90, 3024.16], 40: [2698.52, 3119.68],
      41: [2806.75, 3244.80], 42: [2890.09, 3341.14], 43: [2973.41, 3437.47], 44: [3132.54, 3621.43], 45: [3289.68, 3803.10],
      46: [3450.82, 3989.39], 47: [3608.28, 4171.43], 48: [3730.53, 4312.75], 49: [3839.09, 4438.26], 50: [3909.11, 4519.20],
      51: [3943.16, 4558.57], 52: [4012.36, 4638.56], 53: [4109.08, 4750.39], 54: [4297.65, 4968.38], 55: [4513.74, 5218.19],
      56: [4729.79, 5467.97], 57: [4945.93, 5717.83], 58: [5162.07, 5967.71], 59: [5494.06, 6351.51], 60: [5925.98, 6850.85],
      61: [6205.18, 7173.62], 62: [6539.53, 7560.16], 63: [6873.91, 7946.71], 64: [7321.77, 8464.47], 65: [7778.61, 8992.61],
      66: [8228.88, 9513.16], 67: [8808.75, 10183.53], 68: [9383.49, 10847.96], 69: [9894.51, 11438.73], 70: [10180.29, 11769.12],
    },
  },
  WB1: {
    child: [427.32, 494.01],
    adult: {
      21: [974.51, 1126.60], 22: [1005.29, 1162.19], 23: [1030.70, 1191.56], 24: [1031.63, 1192.63], 25: [1032.87, 1194.07],
      26: [1033.83, 1195.18], 27: [1039.53, 1201.77], 28: [1040.39, 1202.77], 29: [1040.66, 1203.07], 30: [1040.83, 1203.27],
      31: [1041.33, 1203.85], 32: [1041.97, 1204.58], 33: [1042.58, 1205.29], 34: [1065.88, 1232.23], 35: [1107.46, 1280.30],
      36: [1179.11, 1363.13], 37: [1246.41, 1440.93], 38: [1328.25, 1535.55], 39: [1386.15, 1602.49], 40: [1436.59, 1660.79],
      41: [1556.09, 1798.95], 42: [1632.87, 1887.71], 43: [1711.57, 1978.70], 44: [1798.96, 2079.72], 45: [1885.91, 2180.24],
      46: [1966.31, 2273.19], 47: [2042.59, 2361.38], 48: [2117.86, 2448.39], 49: [2189.35, 2531.04], 50: [2236.73, 2585.82],
      51: [2280.79, 2636.75], 52: [2330.90, 2694.68], 53: [2397.75, 2771.97], 54: [2527.49, 2921.96], 55: [2678.21, 3096.19],
      56: [2830.62, 3272.39], 57: [2979.66, 3444.69], 58: [3130.33, 3618.87], 59: [3375.41, 3902.21], 60: [3670.42, 4243.26],
      61: [3916.21, 4527.42], 62: [4165.58, 4815.70], 63: [4418.53, 5108.12], 64: [4784.54, 5531.26], 65: [5164.90, 5970.98],
      66: [5550.15, 6416.36], 67: [5944.87, 6872.69], 68: [6349.89, 7340.92], 69: [6615.67, 7648.17], 70: [6833.02, 7899.45],
    },
  },
};

const ADULT_MIN_AGE = 21;
const ADULT_MAX_AGE = 70;
const HL_MULTIPLIER = 0.9; // Healthy Lifestyle Reward — adults 21+ only
const MAX_RATED_KIDS = 2;  // SC rates only the first two children under 21

const round2 = (n: number): number => Math.round(n * 100) / 100;
const clampAge = (age: number): number =>
  Math.min(ADULT_MAX_AGE, Math.max(ADULT_MIN_AGE, Math.round(age)));

export function calculateQuote(req: QuoteRequest): QuoteResult | { error: string } {
  const { plan, adults, kids, healthyLifestyle } = req;

  if (plan !== "WB1" && plan !== "WB2") {
    return { error: "Invalid plan. Must be WB1 or WB2." };
  }
  if (!Array.isArray(adults) || adults.length < 1 || adults.length > 2) {
    return { error: "adults must be an array of 1 or 2 ages." };
  }
  for (const age of adults) {
    if (typeof age !== "number" || !Number.isFinite(age)) {
      return { error: "Each adult age must be a finite number." };
    }
  }
  if (typeof kids !== "number" || !Number.isInteger(kids) || kids < 0 || kids > 8) {
    return { error: "kids must be an integer between 0 and 8." };
  }
  if (typeof healthyLifestyle !== "boolean") {
    return { error: "healthyLifestyle must be a boolean." };
  }

  const rates = SC_RATES[plan];
  const adultMultiplier = healthyLifestyle ? HL_MULTIPLIER : 1;
  const ratedKids = Math.min(kids, MAX_RATED_KIDS);

  // Index 0 = $500-excess (indicative premium), index 1 = Nil-excess.
  let premium500 = 0; // Σ adult[$500] (HL-adjusted) + child[$500] × ratedKids
  let premiumNil = 0; // Σ adult[Nil]  (HL-adjusted) + child[Nil]  × ratedKids

  for (const rawAge of adults) {
    const tuple = rates.adult[clampAge(rawAge)];
    premium500 += tuple[0] * adultMultiplier;
    premiumNil += tuple[1] * adultMultiplier;
  }

  premium500 += rates.child[0] * ratedKids;
  premiumNil += rates.child[1] * ratedKids;

  const indicativeAnnualPremium = round2(premium500);
  const annualSaving = round2(premiumNil - premium500);
  const monthlySaving = round2(annualSaving / 12);

  return { annualSaving, monthlySaving, indicativeAnnualPremium };
}
