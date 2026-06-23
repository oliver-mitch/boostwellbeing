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

// Where landing-page lead notifications are sent. Override with LEADS_NOTIFY_EMAIL.
const LEADS_NOTIFY_EMAIL = process.env.LEADS_NOTIFY_EMAIL || 'oliver@eighty8.co.nz';

const nzd = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-NZ');

export interface RetailSavingSnapshot {
  planLabel: string;
  annualSaving: number;
  monthlySaving: number;
  indicativeAnnualPremium: number;
  healthyLifestyle: boolean;
  adults: number;
  kids: number;
}

// Emails the prospect their own estimated saving (from the calculator).
export async function sendRetailSavingEmail(
  email: string,
  name: string | undefined,
  s: RetailSavingSnapshot
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: email,
      subject: `Your estimated Southern Cross saving — ${nzd(s.annualSaving)}/year`,
      html: `
        <div style="${EMAIL_SHELL_STYLE}">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #0F172A; font-size: 24px; margin: 0;">
              <span style="color: #4D90DE;">Boost</span>Wellbeing
            </h1>
          </div>
          <div style="${CARD_STYLE}">
            <h2 style="color: #0F172A; font-size: 20px; margin: 0 0 16px;">Your estimated saving</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">Hi${name ? ` ${name}` : ''},</p>
            <div style="text-align: center; background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 24px; margin: 0 0 24px;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 4px;">Estimated annual saving</p>
              <p style="color: #21B1A6; font-size: 40px; font-weight: 700; margin: 0;">${nzd(s.annualSaving)}</p>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 0;">about ${nzd(s.monthlySaving)} / month</p>
            </div>
            <table style="width: 100%; font-size: 14px; color: #475569; border-collapse: collapse;">
              <tr><td style="padding: 6px 0;">Plan</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${s.planLabel} ($500 excess)</td></tr>
              <tr><td style="padding: 6px 0;">Adults / children</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${s.adults} / ${s.kids}</td></tr>
              <tr><td style="padding: 6px 0;">Healthy Lifestyle reward</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${s.healthyLifestyle ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 6px 0;">Indicative annual premium</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${nzd(s.indicativeAnnualPremium)}</td></tr>
            </table>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 24px 0 0;">
              We cover the $500 excess on your first claim — so on the same Southern Cross cover, you keep the lower premium and pay no excess. Reply to this email or book a quick call and an adviser will walk you through it.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin: 0;">
              Indicative only — not a quote, contract, or offer of insurance, and not personalised financial advice. Premiums are confirmed by Southern Cross on application. The $500 excess reimbursement is provided by BoostWellbeing (with Risk Solutions Ltd) on the first eligible claim, per person, per policy year.
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

// Notifies the team of a new landing-page lead.
export async function sendRetailLeadNotification(lead: {
  leadType: string;
  name?: string;
  email?: string;
  phone?: string;
  detail?: string;
}): Promise<{ success: boolean; error?: string }> {
  const labels: Record<string, string> = {
    book_call: 'Book a 10-min call',
    more_info: 'Get more info',
    send_saving: 'Send me my saving',
  };
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: LEADS_NOTIFY_EMAIL,
      subject: `New retail lead — ${labels[lead.leadType] ?? lead.leadType}${lead.name ? ` (${lead.name})` : ''}`,
      html: `
        <div style="${EMAIL_SHELL_STYLE}">
          <div style="${CARD_STYLE}">
            <h2 style="color: #0F172A; font-size: 18px; margin: 0 0 16px;">New retail savings lead</h2>
            <table style="width: 100%; font-size: 14px; color: #475569; border-collapse: collapse;">
              <tr><td style="padding: 6px 0;">Type</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${labels[lead.leadType] ?? lead.leadType}</td></tr>
              <tr><td style="padding: 6px 0;">Name</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${lead.name || '—'}</td></tr>
              <tr><td style="padding: 6px 0;">Email</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${lead.email || '—'}</td></tr>
              <tr><td style="padding: 6px 0;">Phone</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${lead.phone || '—'}</td></tr>
              ${lead.detail ? `<tr><td style="padding: 6px 0;">Detail</td><td style="padding: 6px 0; text-align: right;">${lead.detail}</td></tr>` : ''}
            </table>
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

// ── Facebook Lead Auto-Reply ──────────────────────────────────────────────────

// Sends the approved follow-up email to a new Facebook lead.
// From address must be oliver@boostwellbeing.co.nz — requires boostwellbeing.co.nz
// to be verified in Resend (SPF/DKIM on Cloudflare). Until verified, set
// FB_LEAD_FROM_EMAIL in Vercel env to onboarding@resend.dev for testing.
export async function sendFacebookLeadAutoReply(
  email: string,
  firstName: string | null
): Promise<{ success: boolean; error?: string }> {
  const fromEmail = process.env.FB_LEAD_FROM_EMAIL || 'oliver@boostwellbeing.co.nz';
  const from = `Ollie from BoostWellbeing <${fromEmail}>`;
  const greeting = firstName ? firstName : 'there';

  const plainText = `Hi ${greeting},

Thanks for putting your hand up on Facebook. Here's how it works — it's simpler than it sounds.

We get you the same Southern Cross cover for a lower premium — and we cover your $500 excess. Every Southern Cross Wellbeing plan has a Nil-excess and a $500-excess version: identical cover, but the $500-excess one is cheaper. We put you on that version so you pay less, then cover the $500 excess ourselves, so you're never out of pocket.

How much you save depends on where you're starting from, so the one thing I need to know is which of these is you:

Already with Southern Cross — the easy one. We move you to the $500-excess version of your plan, you keep the exact same cover, and pocket the difference. The calculator shows it in seconds: https://boostwellbeing.co.nz/southern-cross-savings#calculator

With another insurer — we can look at moving you across, but your saving depends on what you're paying now, and we'll check pre-existing conditions and stand-downs carefully before anything changes, so you don't lose cover you already rely on. A quick chat is the best way to see your real number.

Not covered yet — no problem. You start on the lower-premium $500-excess plan and we cover the excess from day one.

Just hit reply with which one you are (or call me on 021 720 710) and I'll take it from there — most people are sorted within a week. The advice costs you nothing; Southern Cross pays us, not you.

Cheers,
Ollie
BoostWellbeing — same cover, lower premium
021 720 710 · boostwellbeing.co.nz

P.S. The figure in our ad is what my family saved (2 adults, 2 kids) — your saving depends on your situation, so use the calculator or call us now to find yours.

---
The saving is the difference between the Nil-excess and $500-excess premium on the same Southern Cross plan — it is not a switch between insurers, and figures are indicative only (not a quote or personalised advice; premiums are confirmed by Southern Cross on application). The $500 excess reimbursement is provided by BoostWellbeing (with Risk Solutions Ltd), not Southern Cross, and applies to your first eligible claim each policy year. Financial advice is provided by Risk Solutions Limited (FSP718392); disclosure at risksolutions.net.nz/about. Southern Cross Health Society is the insurer; BoostWellbeing is a distributor of its plans.

Prefer I didn't follow up? Just reply and let me know.`;

  const html = `<div style="font-family: Inter, Arial, Helvetica, sans-serif; font-size: 15px; color: #0F172A; line-height: 1.55; max-width: 600px;">
<p>Hi ${greeting},</p>

<p>Thanks for putting your hand up on Facebook. Here's how it works — it's simpler than it sounds.</p>

<p>We get you the same Southern Cross cover for a lower premium — and we cover your $500 excess. Every Southern Cross Wellbeing plan has a Nil-excess and a $500-excess version: identical cover, but the $500-excess one is cheaper. We put you on that version so you pay less, then cover the $500 excess ourselves, so you're never out of pocket.</p>

<p>How much you save depends on where you're starting from, so the one thing I need to know is which of these is you:</p>

<p><strong>Already with Southern Cross</strong> — the easy one. We move you to the $500-excess version of your plan, you keep the exact same cover, and pocket the difference. The calculator shows it in seconds: <a href="https://boostwellbeing.co.nz/southern-cross-savings#calculator" style="color:#4D90DE;">boostwellbeing.co.nz/southern-cross-savings</a></p>

<p><strong>With another insurer</strong> — we can look at moving you across, but your saving depends on what you're paying now, and we'll check pre-existing conditions and stand-downs carefully before anything changes, so you don't lose cover you already rely on. A quick chat is the best way to see your real number.</p>

<p><strong>Not covered yet</strong> — no problem. You start on the lower-premium $500-excess plan and we cover the excess from day one.</p>

<p>Just hit reply with which one you are (or call me on 021 720 710) and I'll take it from there — most people are sorted within a week. The advice costs you nothing; Southern Cross pays us, not you.</p>

<p>Cheers,<br>
Ollie<br>
BoostWellbeing — same cover, lower premium<br>
021 720 710 · <a href="https://boostwellbeing.co.nz" style="color:#4D90DE;">boostwellbeing.co.nz</a></p>

<p>P.S. The figure in our ad is what my family saved (2 adults, 2 kids) — your saving depends on your situation, so use the calculator or call us now to find yours.</p>

<hr style="border:none; border-top:1px solid #e2e8f0; margin:18px 0;">

<p style="font-size: 12px; color: #64748b; line-height: 1.45;">The saving is the difference between the Nil-excess and $500-excess premium on the same Southern Cross plan — it is not a switch between insurers, and figures are indicative only (not a quote or personalised advice; premiums are confirmed by Southern Cross on application). The $500 excess reimbursement is provided by BoostWellbeing (with Risk Solutions Ltd), not Southern Cross, and applies to your first eligible claim each policy year. Financial advice is provided by Risk Solutions Limited (FSP718392); disclosure at risksolutions.net.nz/about. Southern Cross Health Society is the insurer; BoostWellbeing is a distributor of its plans.</p>

<p style="font-size: 12px; color: #64748b;">Prefer I didn't follow up? Just reply and let me know.</p>
</div>`;

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: 'Same Southern Cross cover, lower premium — here\'s how',
      text: plainText,
      html,
    });
    if (error) {
      console.error('Resend error (Facebook auto-reply):', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error('Email send error (Facebook auto-reply):', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to send email' };
  }
}

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
