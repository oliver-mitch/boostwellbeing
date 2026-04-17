import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-side Supabase client with service-role key.
// Bypasses RLS — NEVER expose this to the browser.
// Use for portal_users, invite_tokens, password_reset_tokens,
// and any other privileged reads/writes.

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for server-side Supabase operations');

  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

// Proxy so `supabaseAdmin.from(...)` lazily initialises on first use
// instead of throwing at import time (which would break `next build`
// in environments that don't have the service-role key set).
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
