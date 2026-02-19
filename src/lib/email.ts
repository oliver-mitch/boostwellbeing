import { Resend } from 'resend';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  userName?: string | null
): Promise<{ success: boolean; error?: string }> {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@boostwellbeing.co.nz';
  const resetUrl = `${process.env.NEXTAUTH_URL}/portal/reset-password?token=${resetToken}`;

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: `BoostWellbeing <${fromEmail}>`,
      to: email,
      subject: 'Reset your BoostWellbeing password',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1e293b; font-size: 24px; margin: 0;">BoostWellbeing</h1>
          </div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 16px;">
              Password Reset Request
            </h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
              Hi${userName ? ` ${userName}` : ''},
            </p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              We received a request to reset your password. Click the button below to choose a new password:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #3b82f6, #22c55e); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
              This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              If the button doesn't work, copy and paste this link into your browser:<br />
              <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
            </p>
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              BoostWellbeing - Powered by Southern Cross Health Insurance
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
