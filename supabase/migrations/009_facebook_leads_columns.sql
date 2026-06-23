-- 009_facebook_leads_columns.sql
-- Extends retail_leads for Meta/Facebook Lead Ads webhook ingestion.
-- Web-form captures (book_call, more_info, send_saving) are unchanged.

-- Allow lead_type to be NULL for Facebook-sourced rows (no CTA type applies)
ALTER TABLE retail_leads ALTER COLUMN lead_type DROP NOT NULL;

-- Expand the check constraint to cover facebook_lead (NULL is allowed)
ALTER TABLE retail_leads DROP CONSTRAINT retail_leads_lead_type_check;
ALTER TABLE retail_leads ADD CONSTRAINT retail_leads_lead_type_check
  CHECK (lead_type IS NULL OR lead_type IN ('book_call', 'more_info', 'send_saving', 'facebook_lead'));

-- Facebook-specific columns
ALTER TABLE retail_leads ADD COLUMN IF NOT EXISTS leadgen_id text UNIQUE;
ALTER TABLE retail_leads ADD COLUMN IF NOT EXISTS status text DEFAULT 'new'
  CHECK (status IN ('new', 'replied', 'skipped'));
ALTER TABLE retail_leads ADD COLUMN IF NOT EXISTS page_id text;
ALTER TABLE retail_leads ADD COLUMN IF NOT EXISTS form_id text;
ALTER TABLE retail_leads ADD COLUMN IF NOT EXISTS replied_at timestamptz;

COMMENT ON COLUMN retail_leads.leadgen_id IS
  'Meta Lead Ads leadgen_id — UNIQUE idempotency key for Facebook lead deduplication.';
COMMENT ON COLUMN retail_leads.status IS
  'Auto-reply pipeline state: new → replied (or skipped for manually-handled leads).';
