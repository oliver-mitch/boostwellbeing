#!/usr/bin/env node
// One-off: seed Ollie as the first portal admin.
// Run:  node scripts/seed-admin.mjs
// Reads .env.local for NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
//
// Emits a temp password. Ollie logs in with it once, then uses "Forgot
// password" to set a permanent one. Do NOT commit the password anywhere.

import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

function loadEnvLocal() {
  try {
    const text = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch (err) {
    console.warn('Could not read .env.local:', err.message);
  }
}

loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const ADMIN_EMAIL = 'oliver@eighty8.co.nz';
const ADMIN_NAME = 'Oliver Mitch';
const COMPANY = 'BoostWellbeing';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const tempPassword = randomBytes(12).toString('base64url');
const passwordHash = await bcrypt.hash(tempPassword, 10);

const { error } = await supabase
  .from('portal_users')
  .upsert(
    {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      company_name: COMPANY,
      password_hash: passwordHash,
      is_admin: true,
    },
    { onConflict: 'email' }
  );

if (error) {
  console.error('Seed failed:', error);
  process.exit(1);
}

console.log(`\nSeeded admin: ${ADMIN_EMAIL}`);
console.log(`Temp password: ${tempPassword}`);
console.log(`\nLog in at ${process.env.NEXTAUTH_URL || 'https://boostwellbeing.co.nz'}/portal/login`);
console.log('Then use "Forgot Password" to set a permanent one.\n');
