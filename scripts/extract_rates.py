"""Extract rates from Southern Cross Individual Rate Card PDF and generate rateData.ts.

Reads 32_RateCard_Individual.pdf, extracts monthly rates for all plans and modules,
applies ~22% workplace scheme discount for employee rates, and outputs updated TypeScript.

Usage:
    python3 scripts/extract_rates.py
    python3 scripts/extract_rates.py --dry-run  # just print extracted data
"""

import json
import re
import sys
from pathlib import Path

import pdfplumber

RATE_CARD_PDF = Path("/mnt/c/Users/olive/Downloads/BoostWellbeing_SouthernCross/32_RateCard_Individual.pdf")
WORKPLACE_DISCOUNT = 0.22  # ~22% discount for workplace schemes

def extract_tables_from_pdf(pdf_path: Path) -> list[dict]:
    """Extract all rate tables from the PDF, identifying monthly premium pages."""
    all_tables = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            tables = page.extract_tables()
            if tables:
                for table in tables:
                    all_tables.append({
                        "page": i + 1,
                        "text_header": text[:500],
                        "table": table,
                    })
    return all_tables


def find_monthly_tables(all_tables: list[dict]) -> list[dict]:
    """Filter to only monthly premium tables."""
    monthly = []
    for t in all_tables:
        header = t["text_header"].lower()
        if "monthly" in header:
            monthly.append(t)
    return monthly


def parse_rate_value(val: str | None) -> float | None:
    """Parse a dollar amount like '$93.88' to float."""
    if not val:
        return None
    val = val.strip().replace("$", "").replace(",", "").replace(" ", "")
    try:
        return float(val)
    except ValueError:
        return None


def parse_age(val: str | None) -> int | None:
    """Parse age value from table cell."""
    if not val:
        return None
    val = val.strip()
    # Handle "0-20" range
    if "-" in val and "65+" not in val:
        parts = val.split("-")
        try:
            return int(parts[0])  # Return the start age
        except ValueError:
            return None
    # Handle "65+" or "65+CR"
    if "65+" in val or "CR" in val:
        return None  # Skip the CR row
    try:
        return int(val)
    except ValueError:
        return None


def identify_columns(header_row: list[str | None]) -> dict[str, int]:
    """Identify which column index maps to which plan/module."""
    col_map = {}
    for i, cell in enumerate(header_row):
        if not cell:
            continue
        cell_clean = cell.strip().upper()
        # Plan columns
        if "$4,000" in cell or "$4000" in cell:
            col_map["wb1_4000"] = i
        elif "$2,000" in cell or "$2000" in cell:
            col_map["wb1_2000"] = i
        elif "$1,000" in cell or "$1000" in cell:
            col_map["wb1_1000"] = i
        elif "$500" in cell:
            col_map["wb1_500"] = i
        elif "NIL" in cell_clean or (cell_clean in ("", "A", "B", "C", "D", "E") and i > 3):
            pass  # Will identify by position
        # Module columns
        if "BODYCARE" in cell_clean or "BODY CARE" in cell_clean:
            col_map["body_care"] = i
        elif "DAY TO DAY" in cell_clean or "DAY-TO-DAY" in cell_clean:
            col_map["day_to_day"] = i
        elif "VISION" in cell_clean or "DENTAL" in cell_clean:
            col_map["vision_dental"] = i
        elif "KEEPING WELL" in cell_clean:
            col_map["keeping_well"] = i
    return col_map


def extract_monthly_rates(pdf_path: Path) -> dict:
    """Extract all monthly rates from the rate card PDF.

    Returns dict with keys for each plan/module containing list of (age, rate) tuples.
    """
    rates = {}

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text() or ""

            # Only process monthly premium pages
            if "monthly" not in text.lower():
                continue

            tables = page.extract_tables()
            if not tables:
                continue

            # Determine which plan group this page is for
            text_upper = text.upper()

            if "WELLBEING 1" in text_upper or "WB_1" in text_upper or "WELLBEING1" in text_upper:
                plan_group = "wb1"
            elif "WELLBEING 2" in text_upper or "WB_2" in text_upper or "WELLBEING2" in text_upper:
                plan_group = "wb2"
            elif "ULTRACARE" in text_upper:
                plan_group = "ultracare"
            else:
                # Try to identify from table content
                plan_group = None

            for table in tables:
                if len(table) < 3:
                    continue

                # Find the header row (first row with plan names or excess amounts)
                header_idx = 0
                for idx, row in enumerate(table):
                    row_text = " ".join(str(c or "") for c in row).upper()
                    if "$" in row_text and ("500" in row_text or "NIL" in row_text or "000" in row_text):
                        header_idx = idx
                        break
                    if "AGE" in row_text or "EXCESS" in row_text:
                        header_idx = idx
                        break

                header = table[header_idx]

                # Parse data rows
                for row in table[header_idx + 1:]:
                    if not row or len(row) < 3:
                        continue

                    # First column(s) are typically age
                    age = None
                    age_display = None
                    for cell_idx in range(min(2, len(row))):
                        cell = str(row[cell_idx] or "").strip()
                        if cell.isdigit():
                            age = int(cell)
                            break
                        elif "-" in cell and cell.replace("-", "").replace(" ", "").isdigit():
                            # Range like "0-20"
                            age = 0  # Use 0 for child rate
                            age_display = cell
                            break

                    if age is None:
                        # Check for 65+ CR row
                        row_text = " ".join(str(c or "") for c in row)
                        if "65+" in row_text and "CR" in row_text:
                            age = 65  # 65+CR rate
                            age_display = "65+CR"
                        else:
                            continue

                    # Extract rate values from remaining columns
                    rate_values = []
                    for cell in row:
                        val = parse_rate_value(str(cell or ""))
                        if val is not None and val > 1.0:  # Skip age numbers
                            rate_values.append(val)

                    if not rate_values:
                        continue

                    # Store with page info for later mapping
                    key = f"page_{page_num + 1}"
                    if key not in rates:
                        rates[key] = {
                            "plan_group": plan_group,
                            "header": [str(c or "").strip() for c in header],
                            "rows": [],
                        }
                    rates[key]["rows"].append({
                        "age": age,
                        "age_display": age_display or str(age),
                        "values": rate_values,
                    })

    return rates


def main():
    dry_run = "--dry-run" in sys.argv

    print("=" * 70)
    print("Southern Cross Rate Card → rateData.ts Generator")
    print("=" * 70)
    print(f"Source PDF: {RATE_CARD_PDF}")
    print(f"Workplace discount: {WORKPLACE_DISCOUNT * 100}%")
    print()

    if not RATE_CARD_PDF.exists():
        print(f"ERROR: PDF not found: {RATE_CARD_PDF}")
        sys.exit(1)

    # Extract raw table data
    print("Extracting tables from PDF...")
    rates = extract_monthly_rates(RATE_CARD_PDF)

    print(f"\nFound {len(rates)} monthly rate tables:")
    for key, data in rates.items():
        print(f"  {key}: plan_group={data['plan_group']}, rows={len(data['rows'])}")
        print(f"    Header: {data['header'][:10]}")
        if data['rows']:
            print(f"    First row: age={data['rows'][0]['age']}, values={data['rows'][0]['values'][:6]}")
            print(f"    Last row:  age={data['rows'][-1]['age']}, values={data['rows'][-1]['values'][:6]}")

    if dry_run:
        print("\n--- DRY RUN: Full extracted data ---")
        for key, data in rates.items():
            print(f"\n{key} (plan_group={data['plan_group']}):")
            print(f"  Header: {data['header']}")
            for row in data['rows']:
                print(f"  Age {row['age_display']:>5}: {row['values']}")
        return

    print("\nExtraction complete. Review the data above.")


if __name__ == "__main__":
    main()
