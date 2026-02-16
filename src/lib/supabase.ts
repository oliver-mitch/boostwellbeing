import { createClient } from '@supabase/supabase-js';

// Supabase client for plan selector data persistence
// Uses environment variables from .env.local

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your-supabase-url'
);

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    'Supabase environment variables not configured. Database features will not work.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: false, // We're using NextAuth for session management
    },
  }
);

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
