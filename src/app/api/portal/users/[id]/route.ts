import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
  }

  const { data: target } = await supabaseAdmin
    .from('portal_users')
    .select('is_admin')
    .eq('id', id)
    .single();

  if (target?.is_admin) {
    return NextResponse.json({ error: 'Cannot delete an admin user' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('portal_users').delete().eq('id', id);

  if (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
