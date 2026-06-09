# BoostWellbeing — Claude Code Instructions

## Current Task

**Retail Southern Cross Savings Landing Page** — branch `retail-savings-landing`, pending Southern Cross sign-off and compliance review.

**Spec document ID:** `c9e4aed6-cc8a-4552-aa85-9ed23a60619d`
**KB name:** `jarvis_master`
**Spec title:** `BoostWellbeing — Retail Savings Landing Page + Calculator (Build Spec)`

**Status:** Branch `retail-savings-landing` built. Do NOT merge to main or deploy to production until:
1. Southern Cross sign-off received
2. Compliance review completed
3. Oliver reviews and approves

**§8 TODOs remaining** (must resolve before launch):
- Phone number: confirm verified number for the landing page
- FAP disclosure URL: insert once approved
- Callback intake form: wire up once SC compliance approves
- Testimonial: add once consent form signed

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
