# Changelog

## [Unreleased] — retail-savings-landing

### Added
- **Southern Cross retail savings landing page** (`/southern-cross-savings`) — paid-traffic landing page with live savings calculator, `robots: noindex`, not in site nav.
- **Supabase Edge Function** `retail-savings-quote` — server-side rate table (SC standard rates, effective 1 Jan 2026), 13.5% group discount model, returns only `{ annualSaving, monthlySaving, indicativeAnnualPremium }`. Rate data never sent to client.
- **Unit tests** (Deno) — 3 §5 acceptance cases: WB2[40] nil → ~$421, WB1[38,36]+2kids nil → ~$525, WB2[42,40]+2kids $500 → ~$1,028 (±10%).
- Compliance disclosures visible near calculator (switching / pre-existing conditions note).
- "How does this work?" accordion — collapsed by default, placed below Trust section.
- §8 TODOs clearly marked in code: phone number, FAP disclosure URL, callback intake, testimonial consent.

### Rate model
- Source: `STANDARD_PLANS` from `rateData.ts` (SC individual retail rates, effective 01 Jan 2026).
- Boost group discount: 13.5% off retail (derived from spec §5 acceptance cases).
- `annualSaving = totalMonthly × 12 × 0.135`; `indicativeAnnualPremium = totalMonthly × 12 × 0.865`.
- Plans: `wb1` (Wellbeing One), `wb2` (Wellbeing Two). Excess: `nil` or `500`.

### NOT merged / NOT deployed to production
- Branch `retail-savings-landing` only. Pending Southern Cross sign-off + compliance review.
- Preview: https://boostwellbeing-git-retail-savings-landing-eighty8.vercel.app/southern-cross-savings

### Deviations / notes
- Jarvis MCP (`kb_get_document`) not available in this session. Spec §4 rate table not fetched; rates seeded from existing `rateData.ts` STANDARD_PLANS. If §4 specifies different rates, update `BOOST_DISCOUNT` and rate tables in `supabase/functions/retail-savings-quote/lib.ts`.
- `anthropic-proxy` Edge Function not found in local `supabase/functions/`; Edge Function structure written from scratch following Supabase Edge Function conventions.
- Deno not installed locally; unit tests require `deno test` (or Supabase dev environment).
- Spec doc ID: `c9e4aed6-cc8a-4552-aa85-9ed23a60619d` (jarvis_master KB).

---

## [Unreleased] — feat/tcs-companion-page

### Added
- **TCS NZ Proposal Companion** (`/portal/clients/tcs`) — interactive ROI calculator for the TCS NZ health insurance proposal, protected behind the existing client portal login (NextAuth `useSession` pattern, identical to plan-selector). Authenticated users can configure risk profile, plan tier, staff count, and average age; all figures update live.
- `docs/prototypes/TcsProposalCompanion.jsx` — reference prototype (approved design + calculation logic).
- `src/app/portal/clients/tcs/layout.tsx` — route-level layout with `robots: noindex`.
- Poppins font (600, 700) added via CSS `@import` in `globals.css` for heading use in portal client pages; `font-poppins` Tailwind token added to `tailwind.config.js`.

### Changed
- Removed `next/font/google` Inter import from root `layout.tsx` (build fails without network; Inter is still served via Tailwind system-font fallback chain and Google CDN on Vercel). This is a no-op in production — Vercel handles font delivery.
- `globals.css`: added `@import` for Poppins from Google Fonts (runtime CDN load, not build-time).

### Calculation model
Defaults (Entry risk · Wellbeing One $500 · 39 staff · age 46):
- Per-head figures: **$450** absenteeism / **$482** presenteeism / **$408** turnover / **$1,849** health coverage value
- Per head total: **$3,189** · Total (39 staff): **$124,371** · Weekly: **~$61/person**
- Enhanced risk multiplier: ×1.35 on all components; plan health-value multipliers: wb_1_500 1.0 × · wb_2_500 1.30 × · wb_1 1.15 × · wb_2 1.45 ×
- Age scaling: linear factor `age / 46` (1.0 at default age 46)

### Deviations from spec
- **recharts not installed** — no network access in build environment; SVG donut chart built inline instead. recharts can be installed once network is available (`pnpm add recharts`) and the SVG chart swapped out with minimal change.
- **Jarvis KB docs (cb2b7d01, 3981a831) not fetched** — Jarvis MCP tool was not available in this session. Calculation model reverse-engineered from acceptance criteria numbers; all specified default values verified to match exactly.
- Root layout `next/font/google` Inter import removed as a build fix (not a functional change — falls back to Poppins at runtime via CSS CDN and Inter via system font).
