// Protection Adviser calc engine — Phase 1
// Ported from source HTML constants per spec doc 06dded6a-fc16-403b-8820-f946796af865
// TODO (Phase 2): verify all formulas verbatim against docs/protection-adviser-source.html

import { AppInputs, Calculations, EmploymentStatus, LITerm, WaitPeriod } from './types';
import { cuDatabase } from './cu-database';

// NZ 2026/27 income tax brackets
export function calcTax(income: number): number {
  if (income <= 0) return 0;
  let rem = income;
  let tax = 0;
  if (rem > 180000) { tax += (rem - 180000) * 0.39; rem = 180000; }
  if (rem > 78100)  { tax += (rem - 78100)  * 0.33; rem = 78100;  }
  if (rem > 53500)  { tax += (rem - 53500)  * 0.30; rem = 53500;  }
  if (rem > 15600)  { tax += (rem - 15600)  * 0.175; rem = 15600; }
  tax += rem * 0.105;
  return tax;
}

// ACC earner's levy + WSL + GST (annual)
// CoverPlus: 1.75%; CoverPlus Extra: 1.90%; WSL: 0.08%; GST: ×1.15
// Max liable income 2026/27: $156,641
export function calcACC(income: number, emp: EmploymentStatus): number {
  if (income <= 0 || emp === 'Unemployed') return 0;
  const isCPX = emp === 'Sole Trader' || emp === 'Employed by own company';
  const earnersRate = isCPX ? 0.019 : 0.0175;
  const wsl = 0.0008;
  const liableIncome = Math.min(income, 156641);
  return liableIncome * (earnersRate + wsl) * 1.15;
}

export interface JSResult {
  weekly: number;
  type: string;
  annualNet: number;
}

// Jobseeker Support weekly rates (2026/27) and abatement logic
// Base rates: single $372.55, sole parent $521.52, couple (no kids) $633.94, couple (kids) $669.40
// Abatement: sole parent — tier1 30% on $8,320–$13,000, tier2 70% above $13,000
//            all others — 70% above $8,320
export function calculateJobseekerDetailed(
  chargeableIncomeAnnual: number,
  hasPartner: boolean,
  children: number
): JSResult {
  let baseWeekly: number;
  let type: string;

  if (hasPartner && children > 0) {
    baseWeekly = 669.40; type = 'Couple with children';
  } else if (hasPartner) {
    baseWeekly = 633.94; type = 'Couple, no children';
  } else if (children > 0) {
    baseWeekly = 521.52; type = 'Sole parent';
  } else {
    baseWeekly = 372.55; type = 'Single, no children';
  }

  const annualGross = baseWeekly * 52;
  let abatement = 0;

  if (!hasPartner && children > 0) {
    if (chargeableIncomeAnnual > 8320) {
      const tier1 = Math.min(chargeableIncomeAnnual, 13000) - 8320;
      abatement += tier1 * 0.30;
      if (chargeableIncomeAnnual > 13000) {
        abatement += (chargeableIncomeAnnual - 13000) * 0.70;
      }
    }
  } else {
    if (chargeableIncomeAnnual > 8320) {
      abatement = (chargeableIncomeAnnual - 8320) * 0.70;
    }
  }

  const annualNet = Math.max(0, annualGross - abatement);
  return { weekly: annualNet / 52, type, annualNet };
}

// Working for Families annual total
// FTC: $152/wk (1st child) + $124/wk (each additional); abates 27.5% above $44,900
// IWTC: $147/wk + $15/wk per child after 3rd; suspended on Jobseeker
// Best Start: $77/wk per under-3; abates 21% above $79,000
export function calculateWfF(
  grossHouseholdIncome: number,
  children: number,
  childrenUnder3: number,
  receivingJobseeker: boolean
): number {
  if (children === 0) return 0;

  const ftcGross = 152 * 52 + Math.max(0, children - 1) * (124 * 52);
  const ftcAbatement = Math.max(0, (grossHouseholdIncome - 44900) * 0.275);
  const ftc = Math.max(0, ftcGross - ftcAbatement);

  const iwtc = receivingJobseeker
    ? 0
    : 147 * 52 + Math.max(0, children - 3) * (15 * 52);

  const bsGross = childrenUnder3 * (77 * 52);
  const bsAbatement = Math.max(0, (grossHouseholdIncome - 79000) * 0.21);
  const bestStart = Math.max(0, bsGross - bsAbatement);

  return ftc + iwtc + bestStart;
}

export interface CULookupResult {
  code: string;
  description: string;
  earnersRate: number;
  cpxRate: number;
  found: boolean;
}

export function lookupCU(code: string): CULookupResult {
  const entry = cuDatabase[code.trim()];
  if (!entry) {
    return { code, description: 'Unknown CU code', earnersRate: 0, cpxRate: 0, found: false };
  }
  return {
    code,
    description: entry.d,
    earnersRate: entry.e / 100,
    cpxRate: entry.c / 100,
    found: true,
  };
}

function calcLITerm(inputs: AppInputs): LITerm {
  if (!inputs.childrenDetails || inputs.childrenDetails.length === 0) return '10 years';
  const now = Date.now();
  let minAgeYears = Infinity;
  for (const child of inputs.childrenDetails) {
    if (!child.dob) continue;
    const ageMs = now - new Date(child.dob).getTime();
    minAgeYears = Math.min(minAgeYears, ageMs / (365.25 * 24 * 3600 * 1000));
  }
  if (minAgeYears === Infinity) return '10 years';
  const yearsTo18 = Math.max(0, 18 - minAgeYears);
  if (yearsTo18 <= 5)  return '5 years';
  if (yearsTo18 <= 10) return '10 years';
  if (yearsTo18 <= 15) return '15 years';
  return '20 years';
}

export function getSmartDefaults(inputs: AppInputs, calcs: Calculations) {
  const isCPX = (emp: EmploymentStatus) =>
    emp === 'Sole Trader' || emp === 'Employed by own company';

  const totalRepay = calcs.totalMortgageRepayments;
  const waitPeriod: WaitPeriod =
    (inputs.savings || 0) > (totalRepay + 2000) * 3 ? '13 weeks' : '4 weeks';

  return {
    a1: {
      accIncluded: isCPX(inputs.a1.emp),
      accCurrCover: Math.min(inputs.a1.income * 0.8, 156641),
      accPropCover: 40401,
    },
    a2: inputs.hasPartner
      ? {
          accIncluded: isCPX(inputs.a2.emp),
          accCurrCover: Math.min(inputs.a2.income * 0.8, 156641),
          accPropCover: 40401,
        }
      : null,
    liTerm: calcLITerm(inputs),
    waitPeriod,
  };
}

// Core calculation engine
// TODO (Phase 2): verify intermediate values against source HTML with default test inputs:
//   A1: Software Engineer, $80k, Sole Trader, 2 kids, $500k home @ $3,500/mo,
//   $10k savings, $15k other debt, $15k funeral — expected netA1 ≈ $5,036/mo
export function processInputs(inputs: AppInputs): Calculations {
  const a1Inc = inputs.a1.income || 0;
  const a2Inc = inputs.hasPartner ? (inputs.a2.income || 0) : 0;
  const totalGross = a1Inc + a2Inc;

  const taxA1 = calcTax(a1Inc);
  const taxA2 = inputs.hasPartner ? calcTax(a2Inc) : 0;
  const accA1 = calcACC(a1Inc, inputs.a1.emp);
  const accA2 = inputs.hasPartner ? calcACC(a2Inc, inputs.a2.emp) : 0;

  const netA1 = (a1Inc - taxA1 - accA1) / 12;
  const netA2 = inputs.hasPartner ? (a2Inc - taxA2 - accA2) / 12 : 0;

  const netRent = inputs.hasInv
    ? (inputs.invRent - inputs.invRepay - inputs.invRates)
    : 0;
  const totalMortgageRepayments =
    (inputs.hasHome ? inputs.homeRepay : 0) +
    (inputs.hasInv  ? inputs.invRepay  : 0);
  const baseIncomeNeeds = netA1 + netA2 + netRent;

  // Working for Families — normal scenario (both adults earning)
  const wffNormalAnnual = calculateWfF(totalGross, inputs.children, inputs.childrenUnder3, false);
  const sqWfF_total = wffNormalAnnual / 12;

  // Jobseeker entitlements — ill person earns $0, so chargeableIncome = 0
  const jsA1 = calculateJobseekerDetailed(0, inputs.hasPartner, inputs.children);
  const jsA1Monthly = jsA1.weekly * 52 / 12;

  const jsA2 = inputs.hasPartner
    ? calculateJobseekerDetailed(0, true, inputs.children)
    : null;
  const jsA2Monthly = jsA2 ? jsA2.weekly * 52 / 12 : 0;

  // WfF in illness scenarios (ill adult is on Jobseeker → IWTC suspended)
  const wff_ill_a1Annual = calculateWfF(
    a2Inc + jsA1Monthly * 12,
    inputs.children, inputs.childrenUnder3, true
  );
  const wff_ill_a1_total = wff_ill_a1Annual / 12;

  const wff_ill_a2Annual = inputs.hasPartner
    ? calculateWfF(a1Inc + jsA2Monthly * 12, inputs.children, inputs.childrenUnder3, true)
    : 0;
  const wff_ill_a2_total = wff_ill_a2Annual / 12;

  // ACC scenarios — ACC pays 80% of income up to max
  const accCoverA1 = Math.min(a1Inc * 0.8, 156641);
  const accNetMonthlyA1 = (accCoverA1 - calcTax(accCoverA1)) / 12;

  const accCoverA2 = inputs.hasPartner ? Math.min(a2Inc * 0.8, 156641) : 0;
  const accNetMonthlyA2 = inputs.hasPartner
    ? (accCoverA2 - calcTax(accCoverA2)) / 12
    : 0;

  const wff_acc_a1Annual = calculateWfF(
    accCoverA1 + a2Inc,
    inputs.children, inputs.childrenUnder3, false
  );
  const wff_acc_a1_total = wff_acc_a1Annual / 12;

  const wff_acc_a2Annual = inputs.hasPartner
    ? calculateWfF(a1Inc + accCoverA2, inputs.children, inputs.childrenUnder3, false)
    : 0;
  const wff_acc_a2_total = wff_acc_a2Annual / 12;

  // Monthly shortfalls: (normal take-home + WfF) minus (state replacement + WfF in scenario)
  const sf_ill_a1 = Math.max(
    0,
    (netA1 + sqWfF_total) - (jsA1Monthly + wff_ill_a1_total)
  );
  const sf_ill_a2 = inputs.hasPartner
    ? Math.max(0, (netA2 + sqWfF_total) - (jsA2Monthly + wff_ill_a2_total))
    : 0;

  const sf_acc_a1 = Math.max(
    0,
    (netA1 + sqWfF_total) - (accNetMonthlyA1 + wff_acc_a1_total)
  );
  const sf_acc_a2 = inputs.hasPartner
    ? Math.max(0, (netA2 + sqWfF_total) - (accNetMonthlyA2 + wff_acc_a2_total))
    : 0;

  const disReqA1 = Math.max(sf_ill_a1, sf_acc_a1, 0);
  const disReqA2 = inputs.hasPartner ? Math.max(sf_ill_a2, sf_acc_a2, 0) : 0;

  // Disability product split: MPC covers repayments, IP covers the rest
  const recMpcA1 = Math.min(
    Math.max(totalMortgageRepayments, 0.45 * a1Inc / 12),
    disReqA1
  );
  const recIpA1 = Math.max(0, disReqA1 - recMpcA1);

  const recMpcA2 = inputs.hasPartner
    ? Math.min(Math.max(totalMortgageRepayments, 0.45 * a2Inc / 12), disReqA2)
    : 0;
  const recIpA2 = inputs.hasPartner ? Math.max(0, disReqA2 - recMpcA2) : 0;

  // Life cover = total debt + funeral costs
  const totalDebt =
    (inputs.hasHome ? inputs.homePrin : 0) +
    (inputs.hasInv  ? inputs.invPrin  : 0) +
    (inputs.otherDebt || 0);
  const recLifeA1 = totalDebt + (inputs.funeralCosts || 0);
  const recLifeA2 = inputs.hasPartner ? totalDebt + (inputs.funeralCosts || 0) : 0;

  // Living Income: monthly supplement for surviving household after death
  // null (0) if no partner AND no kids
  const noPartnerNoKids = !inputs.hasPartner && inputs.children === 0;
  const netAfterA1Death = netA2 + sqWfF_total + netRent;
  const recLiA1 = noPartnerNoKids
    ? 0
    : Math.min(
        Math.max(0, netAfterA1Death - totalMortgageRepayments),
        (a1Inc / 12) * 0.625
      );

  const netAfterA2Death = netA1 + sqWfF_total + netRent;
  const recLiA2 = inputs.hasPartner
    ? Math.min(
        Math.max(0, netAfterA2Death - totalMortgageRepayments),
        (a2Inc / 12) * 0.625
      )
    : 0;

  // Trauma = max(annual net income, $50,000)
  const recTraumaA1 = Math.max(netA1 * 12, 50000);
  const recTraumaA2 = inputs.hasPartner ? Math.max(netA2 * 12, 50000) : 0;

  return {
    totalGross,
    netA1, netA2,
    netRent,
    baseIncomeNeeds,
    accA1, accA2,
    jobseekerA1Illness: jsA1Monthly,
    jobseekerA2Illness: jsA2Monthly,
    jsA1_subLabel: jsA1.type,
    jsA2_subLabel: jsA2?.type ?? '',
    sf_ill_a1, sf_acc_a1,
    sf_ill_a2, sf_acc_a2,
    wff_ill_a1_total, wff_acc_a1_total,
    wff_ill_a2_total, wff_acc_a2_total,
    sqWfF_total,
    disReqA1, disReqA2,
    recMpcA1, recIpA1,
    recMpcA2, recIpA2,
    recLifeA1, recLifeA2,
    recLiA1, recLiA2,
    recTraumaA1, recTraumaA2,
    totalMortgageRepayments,
  };
}
