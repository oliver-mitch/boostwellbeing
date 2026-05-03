export type EmploymentStatus = 'Employee' | 'Sole Trader' | 'Employed by own company' | 'Unemployed';
export type Gender = 'Male' | 'Female';
export type YesNo = 'Yes' | 'No';
export type SessionStatus = 'draft' | 'calculated' | 'refined' | 'soa_generated';
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
export type Step = 1 | 2 | 3 | 4 | 5;
export type WaitPeriod = '4 weeks' | '13 weeks' | '26 weeks';
export type IPTerm = 'To Age 65' | '2 years' | '5 years';
export type LITerm = '5 years' | '10 years' | '15 years' | '20 years';
export type MedExcess = '$500 Excess' | '$1,000 Excess' | '$2,000 Excess' | '$5,000 Excess' | '$10,000 Excess';

export interface AdultInputs {
  name: string;
  dob: string;
  gender: Gender;
  smoker: YesNo;
  income: number;
  occ: string;
  emp: EmploymentStatus;
  hours: boolean;
}

export interface ChildDetail {
  name: string;
  dob: string;
  gender: string;
}

export interface AppInputs {
  a1: AdultInputs;
  hasPartner: boolean;
  a2: AdultInputs;
  children: number;
  childrenUnder3: number;
  childrenDetails: ChildDetail[];
  hasHome: boolean;
  homePrin: number;
  homeRepay: number;
  hasInv: boolean;
  invPrin: number;
  invRepay: number;
  invRates: number;
  invRent: number;
  netRentDerived: number;
  savings: number;
  otherDebt: number;
  funeralCosts: number;
}

export interface Calculations {
  totalGross: number;
  netA1: number;
  netA2: number;
  netRent: number;
  baseIncomeNeeds: number;
  accA1: number;
  accA2: number;
  jobseekerA1Illness: number;
  jobseekerA2Illness: number;
  jsA1_subLabel: string;
  jsA2_subLabel: string;
  sf_ill_a1: number;
  sf_acc_a1: number;
  sf_ill_a2: number;
  sf_acc_a2: number;
  wff_ill_a1_total: number;
  wff_acc_a1_total: number;
  wff_ill_a2_total: number;
  wff_acc_a2_total: number;
  sqWfF_total: number;
  disReqA1: number;
  disReqA2: number;
  recMpcA1: number;
  recIpA1: number;
  recMpcA2: number;
  recIpA2: number;
  recLifeA1: number;
  recLifeA2: number;
  recLiA1: number;
  recLiA2: number;
  recTraumaA1: number;
  recTraumaA2: number;
  totalMortgageRepayments: number;
}

export interface ACCRefinement {
  included: boolean;
  currType?: string;
  propType?: string;
  currCover?: number;
  propCover?: number;
  currCU?: string;
  propCU?: string;
  currRate?: number;
  propRate?: number;
  currTotal?: number;
  propTotal?: number;
  diff?: number;
  currEarnersRate?: number;
  propEarnersRate?: number;
  wsl?: number;
}

export interface ProductRefinement {
  inc_life: boolean;
  r_life: number;
  c_life: string;
  inc_li: boolean;
  r_li: number;
  term_li: LITerm;
  inc_mpc: boolean;
  r_mpc: number;
  inc_ip: boolean;
  r_ip: number;
  c_dis: string;
  wait: WaitPeriod;
  term: IPTerm;
  inc_trauma: boolean;
  r_trauma: number;
  c_trauma: string;
  acc: ACCRefinement;
}

export interface Refinements {
  a1: ProductRefinement;
  a2: ProductRefinement;
  inc_med_hh: boolean;
  r_med_excess: MedExcess;
  c_health: string;
}

export interface SessionRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: SessionStatus;
  inputs: AppInputs;
  calculations: Calculations;
  refinements: Refinements;
  soa_generated_at: string | null;
  user_agent: string | null;
}
