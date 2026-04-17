import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const { data: invite, error } = await supabaseAdmin
    .from('invite_tokens')
    .select('email, company_name, used, expires_at')
    .eq('token', token)
    .single();

  if (error || !invite) {
    return NextResponse.json({ error: 'Invalid invitation token' }, { status: 400 });
  }

  if (invite.used) {
    return NextResponse.json({ error: 'This invitation has already been used' }, { status: 400 });
  }

  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: 'This invitation has expired' }, { status: 400 });
  }

  return NextResponse.json({
    invite: {
      email: invite.email,
      company_name: invite.company_name,
      expires_at: invite.expires_at,
    },
  });
}
