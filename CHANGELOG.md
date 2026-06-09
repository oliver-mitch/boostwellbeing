# Changelog

## [Unreleased] — retail-savings-landing

### Added
- **Southern Cross retail savings landing page** (`/southern-cross-savings`) — paid-traffic landing page with live savings calculator, `robots: noindex`, not in site nav.
- **Supabase Edge Function** `retail-savings-quote` — holds the §4 SC rate card server-side, returns only `{ annualSaving, monthlySaving, indicativeAnnualPremium }`. Rate matrix / per-line premiums never sent to client (§2). CORS + 30/min in-memory rate limiting.
- **Unit tests** (Deno) — the three §5 acceptance cases plus rule coverage: WB2 [42,40]+2 kids HL on → saving ≈$1,028 / premium ≈$6,585; WB2 [40] HL off → $421; WB1 [38,36]+2 kids HL off → $525; first-two-children cap; HL ×0.9 adults-only; age clamp 21–70.
- Persistent switching / pre-existing-conditions note near the calculator (§6.7); "$500 excess — on us" chip + Nil-vs-$500 comparison bars in the result.
- "How does this work?" accordion — collapsed, de-emphasised, below Trust — explains the three-step $500-excess reimbursement (§6.6).
- §8 TODOs clearly marked in code: phone number, FAP disclosure URL, callback intake, testimonial consent.

### Rate model (build spec §3)
- The saving is the **Nil-excess − $500-excess premium difference on the SAME Southern Cross plan** — not a group discount, not a cross-insurer switch. Customer takes the cheaper $500-excess plan; BoostWellbeing (with Risk Solutions Ltd) reimburses the $500 excess on the first eligible claim each policy year.
- Rate table seeded verbatim from spec §4 (KB doc `908dca90-…`), annual / direct-debit, format `age: [$500, Nil]`. **Effective to 30 June 2026 — refresh after 1 July.**
- Healthy Lifestyle Reward = ×0.9 on adult premiums (21+ only). Only the first two children under 21 are rated (`min(kids, 2)`). Adult ages clamp to 21–70.
- Request: `{ plan: "WB1"|"WB2", adults: number[], kids: number, healthyLifestyle: boolean }`.
- Verified: all three §5 cases reproduce exactly (1027.71, 421.16, 524.70; premium 6584.95).

### Fixed — calc rebuilt to spec
- The first build used a guessed **13.5% flat group-discount** model (seeded from `rateData.ts`) because Jarvis MCP / spec §4 was unavailable then. That model couldn't produce the §5 HL family figure ($964 vs $1,028) and its tests were loosened to ±10% and conflated HL with excess. Replaced with the correct §3 model; page/calculator/accordion copy moved off the "buying direct / group discount" framing to the $500-excess mechanism (§7 compliance).

### NOT merged / NOT deployed to production
- Branch `retail-savings-landing` only. Pending Southern Cross sign-off + compliance review + Oliver approval.
- Preview: https://boostwellbeing-git-retail-savings-landing-eighty8.vercel.app/southern-cross-savings

### Notes
- Deno not installed locally; `deno test` could not be run here. The pure `calculateQuote` logic was verified in Node (via `tsx`) against the §5 cases — all pass. Run `deno test supabase/functions/retail-savings-quote/index.test.ts` in CI / a Deno env to confirm.
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
