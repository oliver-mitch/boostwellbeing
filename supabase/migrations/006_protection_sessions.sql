-- Protection Adviser Tool session storage
-- Route: /tools/protection-adviser
-- Owner: Risk Solutions Ltd (FSP718392) / BoostWellbeing hosting only

create table public.protection_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'draft'
    check (status in ('draft','calculated','refined','soa_generated')),
  inputs jsonb not null default '{}'::jsonb,
  calculations jsonb not null default '{}'::jsonb,
  refinements jsonb not null default '{}'::jsonb,
  soa_generated_at timestamptz,
  user_agent text
);

create index protection_sessions_created_at_idx
  on public.protection_sessions (created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger protection_sessions_updated_at
before update on public.protection_sessions
for each row execute function public.set_updated_at();

-- RLS: lock down to API routes only (service role key bypasses RLS server-side)
alter table public.protection_sessions enable row level security;

-- No public policies — all reads/writes go through Next.js API routes
-- using SUPABASE_SERVICE_ROLE_KEY.
