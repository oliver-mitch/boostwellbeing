"""Generate rateData.ts from Southern Cross Individual Rate Card PDF.

Reads 32_RateCard_Individual.pdf, extracts monthly direct-debit rates,
applies ~22% workplace scheme discount for employee rates, and writes rateData.ts.

Usage:
    python3 scripts/generate_ratedata.py
    python3 scripts/generate_ratedata.py --dry-run  # print without writing
"""

import sys
from pathlib import Path

import pdfplumber

RATE_CARD_PDF = Path("/mnt/c/Users/olive/Downloads/BoostWellbeing_SouthernCross/32_RateCard_Individual.pdf")
OUTPUT_FILE = Path(__file__).parent.parent / "src" / "data" / "rateData.ts"
WORKPLACE_DISCOUNT = 0.22  # ~22% discount for workplace schemes
EFFECTIVE_DATE = "01 January 2026"

# Column counts per page type
WB1_RATE_COLS = 9   # 5 plans + 4 modules
WB2_RATE_COLS = 11  # 5 plans + 4 modules + 2 ultracare


def parse_rate(val: str | None) -> float | None:
    if not val:
        return None
    val = val.strip().replace("$", "").replace(",", "").replace(" ", "")
    try:
        v = float(val)
        return v if v > 1.0 else None
    except ValueError:
        return None


def extract_page_rates(page) -> list[dict]:
    """Extract rate rows from a single page. Returns list of {age, values}."""
    text = page.extract_text() or ""
    if "monthly" not in text.lower():
        return []

    tables = page.extract_tables()
    if not tables:
        return []

    rows = []
    for table in tables:
        if len(table) < 3:
            continue

        # Find header row
        header_idx = 0
        for idx, row in enumerate(table):
            row_text = " ".join(str(c or "") for c in row).upper()
            if "$" in row_text and ("500" in row_text or "NIL" in row_text or "000" in row_text):
                header_idx = idx
                break
            if "AGE" in row_text or "EXCESS" in row_text:
                header_idx = idx
                break

        for row in table[header_idx + 1:]:
            if not row or len(row) < 3:
                continue

            # Parse age
            age = None
            for cell_idx in range(min(2, len(row))):
                cell = str(row[cell_idx] or "").strip()
                if cell.isdigit():
                    age = int(cell)
                    break
                elif "-" in cell and cell.replace("-", "").replace(" ", "").isdigit():
                    age = 0  # child rate
                    break

            if age is None:
                row_text = " ".join(str(c or "") for c in row)
                if "65+" in row_text and "CR" in row_text:
                    age = 65
                else:
                    continue

            # Extract all numeric values > 1.0
            values = []
            for cell in row:
                val = parse_rate(str(cell or ""))
                if val is not None:
                    values.append(val)

            if values:
                rows.append({"age": age, "values": values})

    return rows


def extract_rates(pdf_path: Path) -> dict:
    """Extract monthly direct-debit rates from the rate card PDF.

    Returns dict with:
      - wb1: list of {age, plans: [5], modules: [4]}
      - wb2: list of {age, plans: [5], modules: [4], ultracare: [2]}
    """
    wb1_rates = []
    wb2_rates = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            text_upper = text.upper()

            # Only process MONTHLY premium pages (not fortnightly or annual)
            if "MONTHLY PREMIUMS" not in text_upper:
                continue

            # Identify page type from header text
            is_wb1 = "WB_1" in text_upper and "WB_2" not in text_upper
            is_wb2 = "WB_2" in text_upper

            if not is_wb1 and not is_wb2:
                continue

            rows = extract_page_rates(page)
            if not rows:
                continue

            # Determine expected column count
            if is_wb1 and not is_wb2:
                expected_cols = WB1_RATE_COLS
                for row in rows:
                    vals = row["values"]
                    rate_vals = vals[-expected_cols:] if len(vals) >= expected_cols else vals
                    if len(rate_vals) == expected_cols:
                        wb1_rates.append({
                            "age": row["age"],
                            "plans": rate_vals[:5],   # $4000, $2000, $1000, $500, Nil
                            "modules": rate_vals[5:9], # A, B, C, D
                        })

            elif is_wb2:
                expected_cols = WB2_RATE_COLS
                for row in rows:
                    vals = row["values"]
                    rate_vals = vals[-expected_cols:] if len(vals) >= expected_cols else vals
                    if len(rate_vals) == expected_cols:
                        wb2_rates.append({
                            "age": row["age"],
                            "plans": rate_vals[:5],       # $4000, $2000, $1000, $500, Nil
                            "modules": rate_vals[5:9],     # A, B, C, D
                            "ultracare": rate_vals[9:11],  # ULTRA, ULTRA400
                        })

    return {"wb1": wb1_rates, "wb2": wb2_rates}


def build_age_bands(rates: list[dict], value_fn) -> list[tuple[int, int, float]]:
    """Build age-banded rate array from extracted rows.

    Returns list of (ageFrom, ageTo, rate) tuples.
    """
    bands = []
    seen_ages = {}

    for row in rates:
        age = row["age"]
        val = value_fn(row)
        if val is not None:
            seen_ages[age] = val

    if not seen_ages:
        return []

    # Build bands: 0-20 (child), 21-73 (individual), 74-999 (CR/final)
    if 0 in seen_ages:
        bands.append((0, 20, round(seen_ages[0], 2)))
    elif 20 in seen_ages:
        bands.append((0, 20, round(seen_ages[20], 2)))

    for age in range(21, 74):
        if age in seen_ages:
            bands.append((age, age, round(seen_ages[age], 2)))

    # Use age 75 (CR rate) for 74+ if available, otherwise age 74
    if 75 in seen_ages:
        bands.append((74, 999, round(seen_ages[75], 2)))
    elif 74 in seen_ages:
        bands.append((74, 999, round(seen_ages[74], 2)))

    return bands


def build_module_bands(rates: list[dict], module_idx: int, final_age: int) -> list[tuple[int, int, float]]:
    """Build module age bands with a custom final age cutoff."""
    bands = []
    seen_ages = {}

    for row in rates:
        age = row["age"]
        mods = row.get("modules", [])
        if module_idx < len(mods):
            seen_ages[age] = mods[module_idx]

    if not seen_ages:
        return []

    # Child rate
    if 0 in seen_ages:
        bands.append((0, 20, round(seen_ages[0], 2)))
    elif 20 in seen_ages:
        bands.append((0, 20, round(seen_ages[20], 2)))

    # Individual ages up to final_age - 1
    for age in range(21, final_age):
        if age in seen_ages:
            bands.append((age, age, round(seen_ages[age], 2)))

    # Final band
    if final_age in seen_ages:
        bands.append((final_age, 999, round(seen_ages[final_age], 2)))

    return bands


def format_rates_ts(bands: list[tuple[int, int, float]], indent: str = "      ") -> str:
    """Format age bands as TypeScript AgeRate[] entries."""
    lines = []
    for age_from, age_to, rate in bands:
        lines.append(f"{indent}{{ ageFrom: {age_from}, ageTo: {age_to}, rate: {rate:.2f} }}")
    return ",\n".join(lines)


def discount_bands(bands: list[tuple[int, int, float]], factor: float) -> list[tuple[int, int, float]]:
    """Apply discount factor to rate bands."""
    return [(a, b, round(rate * factor, 2)) for a, b, rate in bands]


def generate_ratedata_ts(wb1: list[dict], wb2: list[dict]) -> str:
    """Generate the full rateData.ts content."""
    discount = 1.0 - WORKPLACE_DISCOUNT

    # Extract standard (individual) rate bands for each plan
    # Page 7 (WB1): plans[3] = $500 excess, plans[4] = Nil excess
    wb1_500_std = build_age_bands(wb1, lambda r: r["plans"][3])
    wb1_nil_std = build_age_bands(wb1, lambda r: r["plans"][4])
    # Page 8 (WB2): plans[3] = $500 excess, plans[4] = Nil excess
    wb2_500_std = build_age_bands(wb2, lambda r: r["plans"][3])
    wb2_nil_std = build_age_bands(wb2, lambda r: r["plans"][4])
    # Page 8 UltraCare: ultracare[0] = ULTRA, ultracare[1] = ULTRA400
    ultra_std = build_age_bands(wb2, lambda r: r["ultracare"][0])
    ultra400_std = build_age_bands(wb2, lambda r: r["ultracare"][1])

    # Employee rates = standard × (1 - discount)
    wb1_500_emp = discount_bands(wb1_500_std, discount)
    wb1_nil_emp = discount_bands(wb1_nil_std, discount)
    wb2_500_emp = discount_bands(wb2_500_std, discount)
    wb2_nil_emp = discount_bands(wb2_nil_std, discount)
    ultra_emp = discount_bands(ultra_std, discount)
    ultra400_emp = discount_bands(ultra400_std, discount)

    # Module rates (same for employee and standard)
    # Module A=BodyCare: final band at 67+
    # Module B=DayToDay: final band at 66+
    # Module C=VisionDental: final band at 67+
    # Module D=KeepingWell: final band at 66+
    body_care = build_module_bands(wb1, 0, 67)
    day_to_day = build_module_bands(wb1, 1, 66)
    vision_dental = build_module_bands(wb1, 2, 67)
    keeping_well = build_module_bands(wb1, 3, 66)

    ts = f"""// Southern Cross Health Care Rate Data
// Effective Date: {EFFECTIVE_DATE}
//
// HOW TO UPDATE RATES FROM A NEW SOUTHERN CROSS RATE CARD:
// 1. Update the effective date above
// 2. Run: python3 scripts/generate_ratedata.py
//    (reads the rate card PDF and regenerates this file)
// 3. Run `npm run build` to verify no errors
// 4. Update the "Rates effective" text in TeamHealthCalculator.tsx and portal CostSummary.tsx

export interface AgeRate {{
  ageFrom: number;
  ageTo: number;
  rate: number;
}}

export interface Plan {{
  code: string;
  name: string;
  description: string;
  isEmployeeRate: boolean;
  hasAdultChildBase: boolean;
  rates: AgeRate[];
}}

export interface Module {{
  code: string;
  name: string;
  description: string;
  isEmployeeRate: boolean;
  rates: AgeRate[];
}}

// Base rates for plans that use adult/child base system
// Note: Currently not used in premium calculations (employee plans use discounted rates directly)
export const BASE_RATES = {{
  adult: 0,
  child: 0
}};

// Employee Plans (workplace scheme rates — ~{int(WORKPLACE_DISCOUNT * 100)}% discount on individual rates)
export const EMPLOYEE_PLANS: Plan[] = [
  {{
    code: 'ultracare_base',
    name: 'UltraCare Base',
    description: 'Comprehensive hospital and specialist cover',
    isEmployeeRate: true,
    hasAdultChildBase: true,
    rates: [
{format_rates_ts(ultra_emp)}
    ]
  }},
  {{
    code: 'ultracare_option_400',
    name: 'UltraCare Option 400',
    description: 'UltraCare with $400 excess option',
    isEmployeeRate: true,
    hasAdultChildBase: true,
    rates: [
{format_rates_ts(ultra400_emp)}
    ]
  }},
  {{
    code: 'wb_1_500',
    name: 'Wellbeing One $500',
    description: 'Essential hospital cover with $500 excess',
    isEmployeeRate: true,
    hasAdultChildBase: true,
    rates: [
{format_rates_ts(wb1_500_emp)}
    ]
  }},
  {{
    code: 'wb_1',
    name: 'Wellbeing One',
    description: 'Essential hospital cover',
    isEmployeeRate: true,
    hasAdultChildBase: true,
    rates: [
{format_rates_ts(wb1_nil_emp)}
    ]
  }},
  {{
    code: 'wb_2_500',
    name: 'Wellbeing Two $500',
    description: 'Enhanced hospital cover with $500 excess',
    isEmployeeRate: true,
    hasAdultChildBase: true,
    rates: [
{format_rates_ts(wb2_500_emp)}
    ]
  }},
  {{
    code: 'wb_2',
    name: 'Wellbeing Two',
    description: 'Enhanced hospital cover',
    isEmployeeRate: true,
    hasAdultChildBase: true,
    rates: [
{format_rates_ts(wb2_nil_emp)}
    ]
  }}
];

// Standard (Family Member) Plans - individual rates, no workplace discount
export const STANDARD_PLANS: Plan[] = [
  {{
    code: 'ultracare_base_standard',
    name: 'UltraCare Base (Standard)',
    description: 'Comprehensive hospital and specialist cover',
    isEmployeeRate: false,
    hasAdultChildBase: false,
    rates: [
{format_rates_ts(ultra_std)}
    ]
  }},
  {{
    code: 'ultracare_option_400_standard',
    name: 'UltraCare Option 400 (Standard)',
    description: 'UltraCare with $400 excess option',
    isEmployeeRate: false,
    hasAdultChildBase: false,
    rates: [
{format_rates_ts(ultra400_std)}
    ]
  }},
  {{
    code: 'wb_1_500_standard',
    name: 'Wellbeing One $500 (Standard)',
    description: 'Essential hospital cover with $500 excess',
    isEmployeeRate: false,
    hasAdultChildBase: false,
    rates: [
{format_rates_ts(wb1_500_std)}
    ]
  }},
  {{
    code: 'wb_1_standard',
    name: 'Wellbeing One (Standard)',
    description: 'Essential hospital cover',
    isEmployeeRate: false,
    hasAdultChildBase: false,
    rates: [
{format_rates_ts(wb1_nil_std)}
    ]
  }},
  {{
    code: 'wb_2_500_standard',
    name: 'Wellbeing Two $500 (Standard)',
    description: 'Enhanced hospital cover with $500 excess',
    isEmployeeRate: false,
    hasAdultChildBase: false,
    rates: [
{format_rates_ts(wb2_500_std)}
    ]
  }},
  {{
    code: 'wb_2_standard',
    name: 'Wellbeing Two (Standard)',
    description: 'Enhanced hospital cover',
    isEmployeeRate: false,
    hasAdultChildBase: false,
    rates: [
{format_rates_ts(wb2_nil_std)}
    ]
  }}
];

// Employee Modules (same rates for employee and standard)
export const EMPLOYEE_MODULES: Module[] = [
  {{
    code: 'body_care',
    name: 'Module A: Body Care',
    description: 'Physiotherapy, chiropractic, osteopathy, acupuncture',
    isEmployeeRate: true,
    rates: [
{format_rates_ts(body_care)}
    ]
  }},
  {{
    code: 'day_to_day',
    name: 'Module B: Day-to-day Care',
    description: 'GP visits, prescriptions, x-rays, blood tests',
    isEmployeeRate: true,
    rates: [
{format_rates_ts(day_to_day)}
    ]
  }},
  {{
    code: 'vision_dental',
    name: 'Module C: Vision and Dental',
    description: 'Dental and optical services',
    isEmployeeRate: true,
    rates: [
{format_rates_ts(vision_dental)}
    ]
  }},
  {{
    code: 'keeping_well',
    name: 'Module D: Keeping Well',
    description: 'Health screening and preventive care',
    isEmployeeRate: true,
    rates: [
{format_rates_ts(keeping_well)}
    ]
  }}
];

// Standard (Family Member) Modules
export const STANDARD_MODULES: Module[] = [
  {{
    code: 'body_care_standard',
    name: 'Module A: Body Care (Standard)',
    description: 'Physiotherapy, chiropractic, osteopathy, acupuncture',
    isEmployeeRate: false,
    rates: EMPLOYEE_MODULES[0].rates.map(r => ({{ ...r, rate: r.rate }}))
  }},
  {{
    code: 'day_to_day_standard',
    name: 'Module B: Day-to-day Care (Standard)',
    description: 'GP visits, prescriptions, x-rays, blood tests',
    isEmployeeRate: false,
    rates: EMPLOYEE_MODULES[1].rates.map(r => ({{ ...r, rate: r.rate }}))
  }},
  {{
    code: 'vision_dental_standard',
    name: 'Module C: Vision and Dental (Standard)',
    description: 'Dental and optical services',
    isEmployeeRate: false,
    rates: EMPLOYEE_MODULES[2].rates.map(r => ({{ ...r, rate: r.rate }}))
  }},
  {{
    code: 'keeping_well_standard',
    name: 'Module D: Keeping Well (Standard)',
    description: 'Health screening and preventive care',
    isEmployeeRate: false,
    rates: EMPLOYEE_MODULES[3].rates.map(r => ({{ ...r, rate: r.rate }}))
  }}
];

export function getRateForAge(rates: AgeRate[], age: number): number {{
  const rate = rates.find(r => age >= r.ageFrom && age <= r.ageTo);
  return rate ? rate.rate : 0;
}}

export function calculateMemberPremium(
  plan: Plan,
  modules: Module[],
  age: number,
  isChild: boolean
): number {{
  let total = 0;

  // Add base rate only for standard (non-employee) plans
  // Employee plans have base rates paid by employer
  if (plan.hasAdultChildBase && !plan.isEmployeeRate) {{
    total += isChild ? BASE_RATES.child : BASE_RATES.adult;
  }}

  // Add plan rate
  total += getRateForAge(plan.rates, age);

  // Add module rates
  modules.forEach(module => {{
    total += getRateForAge(module.rates, age);
  }});

  return total;
}}
"""
    return ts


def main():
    dry_run = "--dry-run" in sys.argv

    print("=" * 70)
    print(f"Southern Cross Rate Card → rateData.ts Generator")
    print("=" * 70)
    print(f"Source PDF: {RATE_CARD_PDF}")
    print(f"Workplace discount: {WORKPLACE_DISCOUNT * 100}%")
    print(f"Effective date: {EFFECTIVE_DATE}")
    print()

    if not RATE_CARD_PDF.exists():
        print(f"ERROR: PDF not found: {RATE_CARD_PDF}")
        sys.exit(1)

    print("Extracting rates from PDF...")
    data = extract_rates(RATE_CARD_PDF)

    wb1 = data["wb1"]
    wb2 = data["wb2"]

    print(f"  WB1 rows: {len(wb1)}")
    print(f"  WB2 rows: {len(wb2)}")

    if not wb1 or not wb2:
        print("ERROR: Could not extract rate data from PDF.")
        sys.exit(1)

    # Verify extracted data
    print("\nSample rates (age 21):")
    wb1_21 = next((r for r in wb1 if r["age"] == 21), None)
    wb2_21 = next((r for r in wb2 if r["age"] == 21), None)

    if wb1_21:
        print(f"  WB1 $500: {wb1_21['plans'][3]:.2f}  WB1 Nil: {wb1_21['plans'][4]:.2f}")
        print(f"  Modules: A={wb1_21['modules'][0]:.2f} B={wb1_21['modules'][1]:.2f} "
              f"C={wb1_21['modules'][2]:.2f} D={wb1_21['modules'][3]:.2f}")
    if wb2_21:
        print(f"  WB2 $500: {wb2_21['plans'][3]:.2f}  WB2 Nil: {wb2_21['plans'][4]:.2f}")
        print(f"  UltraCare: {wb2_21['ultracare'][0]:.2f}  Ultra400: {wb2_21['ultracare'][1]:.2f}")

    print("\nGenerating rateData.ts...")
    ts_content = generate_ratedata_ts(wb1, wb2)

    if dry_run:
        print("\n--- DRY RUN: Preview (first 100 lines) ---")
        for i, line in enumerate(ts_content.split("\n")[:100]):
            print(line)
        print("...")
        print(f"\nTotal lines: {len(ts_content.split(chr(10)))}")
        return

    OUTPUT_FILE.write_text(ts_content)
    print(f"Written to: {OUTPUT_FILE}")
    print(f"Total lines: {len(ts_content.split(chr(10)))}")
    print("\nDone! Next steps:")
    print("  1. Run `npm run build` to verify")
    print("  2. Update 'Rates effective' text in TeamHealthCalculator.tsx and CostSummary.tsx")


if __name__ == "__main__":
    main()
