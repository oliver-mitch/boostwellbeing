# Changelog

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
