# BoostWellbeing — Claude Code Instructions

## Current Task

No active build task. Retail savings page + TCS proposal companion + portal access-scoping
were merged to `main` and deployed to production on **2026-06-10** (Oliver approved; SC
sign-off was waived by Oliver). Specs: retail `c9e4aed6-cc8a-4552-aa85-9ed23a60619d`,
TCS `cb2b7d01-4431-4db0-acde-ac20ee681c10` (both in `jarvis_master`).

**Open follow-ups:**
- **Retail §8 TODOs** (Oliver continuing): verified phone number; FAP disclosure URL;
  wire callback intake to the real intake (HubSpot — confirm first); first-person
  testimonial once consent signed. Refresh the SC rate card in
  `supabase/functions/retail-savings-quote/lib.ts` after **1 July 2026** (rates effective
  to 30 June 2026).
- **Portal scoping — activate:** migration `007_portal_client_scope.sql` adds
  `portal_users.client_scope`. Apply it to prod, then `UPDATE portal_users SET
  client_scope='tcs' WHERE email='<david>';` to lock David's login to `/portal/clients/tcs`.
  Middleware (`src/middleware.ts`) enforces it; users with NULL scope are unaffected.
- The retail page is `robots:noindex` and not linked from the main nav.

---

## Previous Task (completed)

Fix the client portal — Supabase tables, Resend email, admin seed, nav link. Bring `Client Login` back to the site.

**Spec document ID:** `d8d4c901-3862-448e-aad3-b042c211d9d7`
**KB name:** `jarvis_master`
**Spec title:** `boostwellbeing-client-portal-fix-spec-v1`

### How to fetch the spec

Use the Jarvis MCP tool `kb_get_document` with:
- `kb_name`: `jarvis_master`
- `doc_id`: `d8d4c901-3862-448e-aad3-b042c211d9d7`
- `include_text`: `true`

Read the full spec before making any changes. Follow phases in order (1 → 6). Don't skip or reorder.

### Phase summary

1. **Supabase schema** — create `portal_users`, `invite_tokens`, `password_reset_tokens` with RLS (service-role access only)
2. **Server-side Supabase client** — add `supabase-server.ts`, move privileged reads/writes off anon into API routes
3. **Email** — Resend helper + invite and password-reset templates
4. **Seed admin** — one-off script to create Ollie as the first admin user (`oliver@eighty8.co.nz`)
5. **Nav link + polish** — add `Client Login` to `SiteNav.tsx` (secondary styling, before Get Started)
6. **Vercel env vars + deploy + verify** — six end-to-end tests listed in the spec

### Scope guardrails — do NOT in this session

- Don't migrate off NextAuth to Supabase Auth — stay on NextAuth Credentials
- Don't redesign the portal dashboard or touch the plan-selector
- Don't add social login, 2FA, SSO, or magic links
- Don't change the nav structure beyond adding `Client Login`

### Ask before starting if unclear

1. Is `noreply@boostwellbeing.co.nz` DNS-verified in Resend (SPF + DKIM)?
2. Confirm `oliver@eighty8.co.nz` is the right admin email.

### Post-session checklist

1. `npm run build` — zero errors
2. Six end-to-end tests from Phase 6 of the spec all pass on production
3. Changelog → `boostwellbeing` KB via `kb_add_document`
4. Session handoff → `jarvis_master` KB via `log_session_handoff` (include Ollie's temp admin password one time — delete once he's reset it)
5. Update this CLAUDE.md to clear the current task pointer

## Previous Tasks (completed)

- Analytics spec v1 (`8caf9e62-8521-42ec-878a-a4115431f42c`) — Vercel Analytics + GA4 Consent Mode v2
- Website spec v2.3 (`6ace3e0b-a188-4407-984b-384fb39c9f6d`) — hero, nav, mobile menu, Wellbeing Survey removal

## Project context

- **Stack:** Next.js / React / Tailwind CSS on Vercel + Railway + Supabase
- **Brand colours:** Blue #4D90DE, Teal #21B1A6, Dark #0F172A
- **Font:** Inter throughout — no other fonts permitted
- **Spelling:** UK English (authorised, organised, colour, etc.)
- **Insurer:** Southern Cross Health Society is the ONLY insurer — never reference others
- **Repo:** C:\Users\olive\Dropbox (Personal) (Old)\My PC (DESKTOP-ABR8J8J)\Documents\GitHub\boostwellbeing\
