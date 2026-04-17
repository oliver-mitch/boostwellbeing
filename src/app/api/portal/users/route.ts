import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('portal_users')
    .select('id, email, name, company_name, is_admin, created_at, last_login_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('List users error:', error);
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 });
  }

  return NextResponse.json({ users: data || [] });
}
