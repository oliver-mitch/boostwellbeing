-- Initial database schema for plan selector
-- This migration creates the tables needed for saving and loading plan selections

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Portal users table (basic user info from auth)
CREATE TABLE IF NOT EXISTS portal_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User plan selections
CREATE TABLE IF NOT EXISTS user_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES portal_users(id) ON DELETE CASCADE,
  plan_code TEXT NOT NULL,
  plan_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members associated with a plan
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID REFERENCES user_plans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 0 AND age <= 120),
  is_employee BOOLEAN DEFAULT false,
  selected_modules JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_plans_user_id ON user_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_plan_id ON family_members(plan_id);
CREATE INDEX IF NOT EXISTS idx_portal_users_email ON portal_users(email);

-- Row Level Security (RLS) policies
ALTER TABLE portal_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data" ON portal_users
  FOR SELECT USING (auth.uid()::text = id::text OR email = auth.jwt()->>'email');

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON portal_users
  FOR UPDATE USING (auth.uid()::text = id::text OR email = auth.jwt()->>'email');

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own data" ON portal_users
  FOR INSERT WITH CHECK (email = auth.jwt()->>'email');

-- Policy: Users can view their own plans
CREATE POLICY "Users can view own plans" ON user_plans
  FOR SELECT USING (user_id IN (
    SELECT id FROM portal_users WHERE email = auth.jwt()->>'email'
  ));

-- Policy: Users can create their own plans
CREATE POLICY "Users can create own plans" ON user_plans
  FOR INSERT WITH CHECK (user_id IN (
    SELECT id FROM portal_users WHERE email = auth.jwt()->>'email'
  ));

-- Policy: Users can update their own plans
CREATE POLICY "Users can update own plans" ON user_plans
  FOR UPDATE USING (user_id IN (
    SELECT id FROM portal_users WHERE email = auth.jwt()->>'email'
  ));

-- Policy: Users can delete their own plans
CREATE POLICY "Users can delete own plans" ON user_plans
  FOR DELETE USING (user_id IN (
    SELECT id FROM portal_users WHERE email = auth.jwt()->>'email'
  ));

-- Policy: Users can view family members of their plans
CREATE POLICY "Users can view own family members" ON family_members
  FOR SELECT USING (plan_id IN (
    SELECT up.id FROM user_plans up
    JOIN portal_users pu ON up.user_id = pu.id
    WHERE pu.email = auth.jwt()->>'email'
  ));

-- Policy: Users can create family members for their plans
CREATE POLICY "Users can create family members" ON family_members
  FOR INSERT WITH CHECK (plan_id IN (
    SELECT up.id FROM user_plans up
    JOIN portal_users pu ON up.user_id = pu.id
    WHERE pu.email = auth.jwt()->>'email'
  ));

-- Policy: Users can update their family members
CREATE POLICY "Users can update family members" ON family_members
  FOR UPDATE USING (plan_id IN (
    SELECT up.id FROM user_plans up
    JOIN portal_users pu ON up.user_id = pu.id
    WHERE pu.email = auth.jwt()->>'email'
  ));

-- Policy: Users can delete their family members
CREATE POLICY "Users can delete family members" ON family_members
  FOR DELETE USING (plan_id IN (
    SELECT up.id FROM user_plans up
    JOIN portal_users pu ON up.user_id = pu.id
    WHERE pu.email = auth.jwt()->>'email'
  ));

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_portal_users_updated_at
  BEFORE UPDATE ON portal_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_plans_updated_at
  BEFORE UPDATE ON user_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
