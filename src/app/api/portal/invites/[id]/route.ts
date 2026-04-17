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
  const { error } = await supabaseAdmin.from('invite_tokens').delete().eq('id', id);

  if (error) {
    console.error('Delete invite error:', error);
    return NextResponse.json({ error: 'Failed to delete invite' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
