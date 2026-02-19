import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendPasswordResetEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

// Generate a secure random token
function generateResetToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// POST /api/auth/reset-password - Request password reset
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: user, error } = await supabase
      .from('portal_users')
      .select('id, email, name')
      .eq('email', email)
      .single();

    // Always return success to prevent email enumeration
    // But only actually create token if user exists
    if (!error && user) {
      const resetToken = generateResetToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

      // Store reset token in database
      const { error: tokenError } = await supabase
        .from('password_reset_tokens')
        .insert({
          user_id: user.id,
          token: resetToken,
          expires_at: expiresAt.toISOString(),
        });

      if (tokenError) {
        console.error('Error creating reset token:', tokenError);
      } else {
        const emailResult = await sendPasswordResetEmail(user.email, resetToken, user.name);
        if (!emailResult.success) {
          console.error('Failed to send reset email:', emailResult.error);
        }
      }
    }

    // Always return success message
    return NextResponse.json(
      {
        message: 'If an account with that email exists, a password reset link has been sent.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Password reset error:', err);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// PUT /api/auth/reset-password - Complete password reset with token
export async function PUT(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Find valid reset token
    const { data: resetToken, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select('user_id, expires_at, used')
      .eq('token', token)
      .single();

    if (tokenError || !resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token is expired or already used
    if (resetToken.used || new Date(resetToken.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Reset token has expired or been used' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user's password
    const { error: updateError } = await supabase
      .from('portal_users')
      .update({ password_hash: passwordHash })
      .eq('id', resetToken.user_id);

    if (updateError) {
      console.error('Error updating password:', updateError);
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 }
      );
    }

    // Mark token as used
    await supabase
      .from('password_reset_tokens')
      .update({ used: true })
      .eq('token', token);

    return NextResponse.json(
      { message: 'Password successfully reset. You can now log in with your new password.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Password reset error:', err);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
