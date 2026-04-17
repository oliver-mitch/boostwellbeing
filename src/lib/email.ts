import { Resend } from 'resend';

// Resend from-address: noreply@boostwellbeing.co.nz requires SPF + DKIM DNS
// records on the domain. Until those are added, we fall back to Resend's
// shared sender. Set RESEND_FROM_EMAIL in env to override.
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

function fromAddress(): string {
  const email = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  return `BoostWellbeing <${email}>`;
}

const EMAIL_SHELL_STYLE = "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;";
const CARD_STYLE = 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;';
const BUTTON_STYLE = 'background: #4D90DE; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;';

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  userName?: string | null
): Promise<{ success: boolean; error?: string }> {
  const resetUrl = `${process.env.NEXTAUTH_URL}/portal/reset-password?token=${resetToken}`;

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: email,
      subject: 'Reset your BoostWellbeing password',
      html: `
        <div style="${EMAIL_SHELL_STYLE}">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #0F172A; font-size: 24px; margin: 0;">
              <span style="color: #4D90DE;">Boost</span>Wellbeing
            </h1>
          </div>
          <div style="${CARD_STYLE}">
            <h2 style="color: #0F172A; font-size: 20px; margin: 0 0 16px;">Reset your password</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi${userName ? ` ${userName}` : ''},</p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              We received a request to reset your BoostWellbeing password. Click the button below to choose a new one.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="${BUTTON_STYLE}">Reset password</a>
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
              This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              If the button doesn't work, copy and paste this link into your browser:<br />
              <a href="${resetUrl}" style="color: #4D90DE; word-break: break-all;">${resetUrl}</a>
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

export async function sendInviteEmail(
  email: string,
  inviteUrl: string,
  companyName?: string | null
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: email,
      subject: "You've been invited to your BoostWellbeing client portal",
      html: `
        <div style="${EMAIL_SHELL_STYLE}">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #0F172A; font-size: 24px; margin: 0;">
              <span style="color: #4D90DE;">Boost</span>Wellbeing
            </h1>
          </div>
          <div style="${CARD_STYLE}">
            <h2 style="color: #0F172A; font-size: 20px; margin: 0 0 16px;">You're invited</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
              ${companyName ? `${companyName} has been set up with a` : 'You\'ve been invited to create a'} BoostWellbeing client portal account.
            </p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              The portal is where you'll access your plan selector, healthcare resources, and ongoing support. Click below to finish setting up your account.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${inviteUrl}" style="${BUTTON_STYLE}">Create your account</a>
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
              This invitation expires in 7 days. If you weren't expecting this, you can ignore the email.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              If the button doesn't work, copy and paste this link into your browser:<br />
              <a href="${inviteUrl}" style="color: #4D90DE; word-break: break-all;">${inviteUrl}</a>
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
