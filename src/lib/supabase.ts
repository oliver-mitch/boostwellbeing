import { createClient } from '@supabase/supabase-js';

// Supabase client for plan selector data persistence
// Uses environment variables from .env.local

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url'
);

if (!isConfigured && typeof window !== 'undefined') {
  console.warn(
    'Supabase environment variables not configured. Plan save/load features will not work.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're using NextAuth for session management
  },
});

export const isSupabaseConfigured = isConfigured;

// Database types for TypeScript
export interface PortalUser {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan_code: string;
  plan_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface FamilyMemberDB {
  id: string;
  plan_id: string;
  name: string;
  age: number;
  is_employee: boolean;
  selected_modules: string[];
  created_at: string;
}
