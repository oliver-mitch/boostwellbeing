-- Migration 005: Portal auth lockdown
-- Fixes the security hole from 002/004 where RLS policies were USING (true),
-- allowing anyone with the public anon key to read password hashes and
-- insert/delete users. After this migration, portal_users, invite_tokens,
-- password_reset_tokens and contact_submissions are accessible only via
-- the service_role key (server-side API routes).
--
-- Also: creates password_reset_tokens (migration 003 never applied on this
-- Supabase project), aligns schema with the portal auth spec
-- (last_login_at, invited_by), removes the hardcoded default admin
-- (known password, security risk), and adds sane defaults to expires_at.

-- ---------------------------------------------------------------------------
-- 1. Create password_reset_tokens (missing — 003 was never run here)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES portal_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  used BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '1 hour'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

-- ---------------------------------------------------------------------------
-- 2. Drop permissive policies
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Users can view own data" ON portal_users;
DROP POLICY IF EXISTS "Users can update own data" ON portal_users;
DROP POLICY IF EXISTS "Users can insert own data" ON portal_users;
DROP POLICY IF EXISTS "Anyone can register with invite" ON portal_users;

DROP POLICY IF EXISTS "Allow all invite operations" ON invite_tokens;
DROP POLICY IF EXISTS "Allow delete invites" ON invite_tokens;

DROP POLICY IF EXISTS "Allow all password reset operations" ON password_reset_tokens;

DROP POLICY IF EXISTS "Allow insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow select for admins" ON contact_submissions;
DROP POLICY IF EXISTS "Allow update for admins" ON contact_submissions;

-- RLS stays enabled. No policies → anon & authenticated get nothing,
-- service_role bypasses RLS.
ALTER TABLE portal_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 3. Schema tweaks to match the spec
-- ---------------------------------------------------------------------------

ALTER TABLE portal_users
  ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE invite_tokens
  ADD COLUMN IF NOT EXISTS invited_by UUID REFERENCES portal_users(id);

ALTER TABLE invite_tokens
  ALTER COLUMN expires_at SET DEFAULT (NOW() + INTERVAL '7 days');

-- created_by was NOT NULL in 002; relax so new inserts can use invited_by.
ALTER TABLE invite_tokens
  ALTER COLUMN created_by DROP NOT NULL;

-- ---------------------------------------------------------------------------
-- 4. Remove the hardcoded default admin
--    (migration 002 inserted admin@boostwellbeing.co.nz with a known bcrypt
--     hash for password "AdminPass123!" — removed for security. Ollie is
--     seeded via scripts/seed-admin.mjs.)
-- ---------------------------------------------------------------------------

DELETE FROM portal_users WHERE email = 'admin@boostwellbeing.co.nz';
