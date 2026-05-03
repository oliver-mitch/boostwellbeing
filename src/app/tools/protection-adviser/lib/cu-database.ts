// ACC Classification Unit (CU) database
// Fields: d = description, e = CoverPlus rate (per $100), c = CoverPlus Extra rate (per $100)
//
// TODO (Phase 2): Transcribe the full ~600-entry database verbatim from
// docs/protection-adviser-source.html once Ollie commits the source HTML.
// The Phase 1 seed below contains the first ~20 entries plus the
// example entry referenced in the spec (78340).
//
// Source: ACC levy tables 2026/27

export const cuDatabase: Record<string, { d: string; e: number; c: number }> = {
  // Agriculture & horticulture
  "01111": { d: "Nursery production", e: 0.88, c: 1.22 },
  "01112": { d: "Turf growing", e: 0.88, c: 1.22 },
  "01113": { d: "Mushroom growing", e: 0.88, c: 1.22 },
  "01120": { d: "Fruit and tree nut growing", e: 1.44, c: 2.00 },
  "01210": { d: "Grape growing", e: 1.44, c: 2.00 },
  "01290": { d: "Other crop growing", e: 1.44, c: 2.00 },
  "01410": { d: "Sheep farming", e: 1.35, c: 1.87 },
  "01420": { d: "Cattle farming", e: 1.35, c: 1.87 },
  "01430": { d: "Deer farming", e: 1.35, c: 1.87 },
  "01440": { d: "Dairy cattle farming", e: 1.93, c: 2.68 },
  "01450": { d: "Pig farming", e: 1.35, c: 1.87 },
  "01460": { d: "Poultry farming", e: 0.88, c: 1.22 },
  "01490": { d: "Other livestock farming", e: 1.35, c: 1.87 },
  "01510": { d: "Mixed crop and livestock farming", e: 1.35, c: 1.87 },
  "01700": { d: "Aquaculture", e: 2.18, c: 3.02 },
  "02000": { d: "Forestry and logging", e: 5.74, c: 7.96 },
  "03000": { d: "Fishing and hunting", e: 4.21, c: 5.83 },
  // Construction
  "41000": { d: "House construction", e: 2.65, c: 3.67 },
  "42000": { d: "Heavy and civil engineering construction", e: 3.18, c: 4.41 },
  "43100": { d: "Land development and site preparation", e: 3.18, c: 4.41 },
  // Professional / Technology (spec example)
  "78340": { d: "Computer systems design", e: 0.02, c: 0.07 },
  "62010": { d: "Computer systems design and related services", e: 0.02, c: 0.07 },
  "69100": { d: "Legal services", e: 0.04, c: 0.10 },
  "69200": { d: "Accounting services", e: 0.04, c: 0.10 },
  "70000": { d: "Management consulting services", e: 0.04, c: 0.10 },
  "74100": { d: "Architectural services", e: 0.07, c: 0.16 },
  "74200": { d: "Surveying and mapping services", e: 0.07, c: 0.16 },
  "74900": { d: "Other professional, scientific and technical services", e: 0.07, c: 0.16 },
  // Health
  "86100": { d: "General practice medical services", e: 0.11, c: 0.24 },
  "86200": { d: "Specialist medical services", e: 0.11, c: 0.24 },
  "86900": { d: "Other health care services", e: 0.22, c: 0.49 },
  // Education
  "85100": { d: "Primary education", e: 0.13, c: 0.28 },
  "85200": { d: "Secondary education", e: 0.13, c: 0.28 },
  "85300": { d: "Higher education", e: 0.13, c: 0.28 },
  // Retail
  "47000": { d: "Retail trade", e: 0.28, c: 0.62 },
  "45100": { d: "Motor vehicle retailing", e: 0.28, c: 0.62 },
  // Hospitality
  "55100": { d: "Accommodation", e: 0.45, c: 0.99 },
  "56100": { d: "Cafes and restaurants", e: 0.32, c: 0.70 },
  "56200": { d: "Takeaway food services", e: 0.32, c: 0.70 },
};
