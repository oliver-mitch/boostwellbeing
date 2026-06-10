import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendRetailSavingEmail, sendRetailLeadNotification } from '@/lib/email';

type LeadType = 'book_call' | 'more_info' | 'send_saving';

interface LeadBody {
  type: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  // saving snapshot (send_saving)
  plan?: string;
  planLabel?: string;
  adults?: number[];
  kids?: number;
  healthyLifestyle?: boolean;
  annualSaving?: number;
  monthlySaving?: number;
  indicativeAnnualPremium?: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { type, name, email, phone } = body;

  // ── Per-type validation ──
  if (type === 'book_call') {
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }
  } else if (type === 'more_info') {
    if (!name || !email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 });
    }
  } else if (type === 'send_saving') {
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (typeof body.annualSaving !== 'number') {
      return NextResponse.json({ error: 'Please calculate your saving first.' }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: 'Unknown lead type.' }, { status: 400 });
  }

  // ── Store (best-effort: never lose a lead if the table isn't migrated yet) ──
  try {
    const { error: dbError } = await supabaseAdmin.from('retail_leads').insert({
      lead_type: type,
      name: name ?? null,
      email: email ?? null,
      phone: phone ?? null,
      plan: body.plan ?? null,
      adults: body.adults ?? null,
      kids: body.kids ?? null,
      healthy_lifestyle: body.healthyLifestyle ?? null,
      annual_saving: body.annualSaving ?? null,
      monthly_saving: body.monthlySaving ?? null,
      indicative_annual_premium: body.indicativeAnnualPremium ?? null,
    });
    if (dbError) console.error('retail_leads insert failed (continuing):', dbError.message);
  } catch (err) {
    console.error('retail_leads insert threw (continuing):', err);
  }

  // ── Email the prospect their saving (send_saving only) ──
  if (type === 'send_saving') {
    const sent = await sendRetailSavingEmail(email!, name, {
      planLabel: body.planLabel || 'Southern Cross Wellbeing',
      annualSaving: body.annualSaving!,
      monthlySaving: body.monthlySaving ?? body.annualSaving! / 12,
      indicativeAnnualPremium: body.indicativeAnnualPremium ?? 0,
      healthyLifestyle: !!body.healthyLifestyle,
      adults: body.adults?.length ?? 1,
      kids: body.kids ?? 0,
    });
    if (!sent.success) {
      return NextResponse.json(
        { error: 'We couldn’t send the email just now. Please try again or call us.' },
        { status: 502 }
      );
    }
  }

  // ── Notify the team (best-effort) ──
  const detail =
    type === 'send_saving' && typeof body.annualSaving === 'number'
      ? `Saving ${Math.round(body.annualSaving)} • ${body.planLabel ?? body.plan ?? ''}`.trim()
      : undefined;
  await sendRetailLeadNotification({ leadType: type, name, email, phone, detail });

  return NextResponse.json({ ok: true });
}
