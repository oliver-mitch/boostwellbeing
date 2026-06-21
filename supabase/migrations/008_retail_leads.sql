-- 008_retail_leads.sql
-- Lead captures from the retail savings landing pages
-- (/southern-cross-savings and /health-insurance-savings):
-- "book a 10-min call", "get more info", and "send me my saving".
-- Written server-side via the service-role key only (RLS denies anon/public).

CREATE TABLE IF NOT EXISTS retail_leads (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_type                 text NOT NULL CHECK (lead_type IN ('book_call', 'more_info', 'send_saving')),
  name                      text,
  email                     text,
  phone                     text,
  -- saving snapshot (for 'send_saving' — what we emailed the prospect)
  plan                      text,
  adults                    jsonb,
  kids                      integer,
  healthy_lifestyle         boolean,
  annual_saving             numeric,
  monthly_saving            numeric,
  indicative_annual_premium numeric,
  source                    text DEFAULT 'southern-cross-savings',
  -- attribution
  utm_source                text,
  utm_medium                text,
  utm_campaign              text,
  utm_content               text,
  utm_term                  text,
  fbclid                    text,
  referrer                  text,
  landing_path              text,
  created_at                timestamptz DEFAULT now()
);

-- RLS on, no policies → only the service-role key (server-side) can read/write.
ALTER TABLE retail_leads ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE retail_leads IS
  'Retail savings landing-page lead captures. Service-role access only (RLS denies anon).';
