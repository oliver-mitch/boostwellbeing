-- 007_portal_client_scope.sql
-- Per-client access scoping for the portal.
--
-- A NULL client_scope = full portal access (staff / admin), unchanged behaviour.
-- A slug (e.g. 'tcs') locks the user to /portal/clients/<slug> only — enforced
-- server-side in src/middleware.ts so scoped client logins (e.g. TCS) can never
-- reach the Wellbeing rate card (/portal/plan-selector) or any other portal page.

ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS client_scope text;

COMMENT ON COLUMN portal_users.client_scope IS
  'NULL = full portal access. A slug (e.g. ''tcs'') restricts the user to /portal/clients/<slug> only (enforced in middleware).';

-- To grant a TCS-only login once David''s account exists:
--   UPDATE portal_users SET client_scope = 'tcs' WHERE email = '<david@tcs...>';
