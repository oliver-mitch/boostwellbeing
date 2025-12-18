-- Migration: Add contact form submissions table
-- This stores all contact form submissions for record-keeping

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  number_of_employees TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, closed
  notes TEXT, -- Internal notes for follow-up
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance and searching
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company ON contact_submissions(company_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow insert from API (auth is handled at app level)
CREATE POLICY "Allow insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only allow admins to view/update (we'll handle this in the app)
CREATE POLICY "Allow select for admins" ON contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow update for admins" ON contact_submissions
  FOR UPDATE USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_submission_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER trigger_update_contact_submission_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_submission_updated_at();
