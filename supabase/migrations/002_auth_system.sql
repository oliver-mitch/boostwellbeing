-- Migration: Add authentication tables for invite-only system
-- This adds invite tokens and admin functionality

-- Invite tokens table for invite-only registration
CREATE TABLE IF NOT EXISTS invite_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  created_by TEXT NOT NULL, -- admin email who created
  used BOOLEAN DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add admin flag to portal_users
ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create index on invite tokens
CREATE INDEX IF NOT EXISTS idx_invite_tokens_token ON invite_tokens(token);
CREATE INDEX IF NOT EXISTS idx_invite_tokens_email ON invite_tokens(email);

-- RLS for invite_tokens
ALTER TABLE invite_tokens ENABLE ROW LEVEL SECURITY;

-- Allow all operations on invite_tokens (auth is handled at app level)
CREATE POLICY "Allow all invite operations" ON invite_tokens
  FOR ALL USING (true) WITH CHECK (true);

-- Allow delete operations
CREATE POLICY "Allow delete invites" ON invite_tokens
  FOR DELETE USING (true);

-- Create default admin user (you can change the password later)
-- Password: AdminPass123!
INSERT INTO portal_users (email, name, is_admin, company_name, password_hash)
VALUES (
  'admin@boostwellbeing.co.nz',
  'Admin User',
  true,
  'BoostWellbeing',
  '$2b$10$rA1gqBgjReyRaMWtqePujOFIKB.7wG6hETzfuipaQxjARGlqf/Jhy'
)
ON CONFLICT (email) DO UPDATE SET is_admin = true, password_hash = '$2b$10$rA1gqBgjReyRaMWtqePujOFIKB.7wG6hETzfuipaQxjARGlqf/Jhy';

-- Update RLS policies to allow public registration with invite
CREATE POLICY "Anyone can register with invite" ON portal_users
  FOR INSERT WITH CHECK (true);

-- Allow public select for login
DROP POLICY IF EXISTS "Users can view own data" ON portal_users;
CREATE POLICY "Users can view own data" ON portal_users
  FOR SELECT USING (true);
