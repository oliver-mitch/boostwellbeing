# BoostWellbeing — Claude Code Instructions

## Current Task

Execute the website spec v2.3 from the Jarvis knowledge base.

**Spec document ID:** `6ace3e0b-a188-4407-984b-384fb39c9f6d`
**KB name:** `boostwellbeing`

### How to fetch the spec

Use the Jarvis MCP tool `kb_get_document` with:
- `kb_name`: `boostwellbeing`
- `doc_id`: `6ace3e0b-a188-4407-984b-384fb39c9f6d`
- `include_text`: `true`

Read the full spec before making any changes. Follow it exactly.

### Post-deployment checklist

1. Run `npm run build` — confirm zero errors
2. Write a changelog entry to the `boostwellbeing` KB via `kb_add_document`
3. Log a session handoff to the `jarvis_master` KB via `log_session_handoff`

## Project context

- **Stack:** Next.js / React / Tailwind CSS on Vercel
- **Brand colours:** Blue #4D90DE, Teal #21B1A6, Dark #0F172A
- **Font:** Inter throughout — no other fonts permitted
- **Spelling:** UK English (authorised, organised, colour, etc.)
- **Insurer:** Southern Cross Health Society is the ONLY insurer — never reference others
