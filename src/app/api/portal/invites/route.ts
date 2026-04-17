import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendInviteEmail } from '@/lib/email';

function generateInviteToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('invite_tokens')
    .select('id, token, email, company_name, used, used_at, expires_at, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('List invites error:', error);
    return NextResponse.json({ error: 'Failed to load invites' }, { status: 500 });
  }

  return NextResponse.json({ invites: data || [] });
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { email, company_name } = await request.json();

    if (!email || !company_name) {
      return NextResponse.json({ error: 'Email and company name are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const token = generateInviteToken();
    const normalisedEmail = email.toLowerCase();

    const { data: invite, error: insertError } = await supabaseAdmin
      .from('invite_tokens')
      .insert({
        token,
        email: normalisedEmail,
        company_name,
        invited_by: session.user.id,
      })
      .select('id, token, email, company_name, expires_at')
      .single();

    if (insertError || !invite) {
      console.error('Create invite error:', insertError);
      return NextResponse.json({ error: 'Failed to create invite' }, { status: 500 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;
    const inviteUrl = `${baseUrl}/portal/register?token=${token}`;

    const emailResult = await sendInviteEmail(normalisedEmail, inviteUrl, company_name);
    if (!emailResult.success) {
      console.error('Failed to send invite email:', emailResult.error);
    }

    return NextResponse.json({
      invite,
      inviteUrl,
      emailSent: emailResult.success,
      emailError: emailResult.success ? undefined : emailResult.error,
    });
  } catch (err) {
    console.error('Create invite error:', err);
    return NextResponse.json({ error: 'Failed to create invite' }, { status: 500 });
  }
}
