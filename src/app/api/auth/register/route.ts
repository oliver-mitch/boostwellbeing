import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, name, password } = await request.json();

    if (!token || !name || !password) {
      return NextResponse.json({ error: 'Token, name and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('invite_tokens')
      .select('id, email, company_name, used, expires_at')
      .eq('token', token)
      .single();

    if (inviteError || !invite) {
      return NextResponse.json({ error: 'Invalid invitation token' }, { status: 400 });
    }

    if (invite.used) {
      return NextResponse.json({ error: 'This invitation has already been used' }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This invitation has expired' }, { status: 400 });
    }

    const { data: existingUser } = await supabaseAdmin
      .from('portal_users')
      .select('id')
      .eq('email', invite.email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { error: createError } = await supabaseAdmin
      .from('portal_users')
      .insert({
        email: invite.email,
        name,
        company_name: invite.company_name,
        password_hash: passwordHash,
        is_admin: false,
      });

    if (createError) {
      console.error('Create user error:', createError);
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
    }

    await supabaseAdmin
      .from('invite_tokens')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('id', invite.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}
