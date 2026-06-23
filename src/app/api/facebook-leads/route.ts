import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendFacebookLeadAutoReply } from '@/lib/email';

// ── Helpers ──────────────────────────────────────────────────────────────────

function env(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

function validateHmacSignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = 'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

function extractField(fieldData: Array<{ name: string; values: string[] }>, ...keys: string[]): string | null {
  for (const key of keys) {
    const field = fieldData.find((f) => f.name === key);
    if (field?.values?.[0]) return field.values[0];
  }
  return null;
}

// ── GET — webhook verification ────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    console.log('Facebook webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ── POST — webhook events ─────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  // Validate HMAC signature
  const signature = request.headers.get('x-hub-signature-256') ?? '';
  let appSecret: string;
  try {
    appSecret = env('META_APP_SECRET');
  } catch {
    console.error('META_APP_SECRET not configured');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  if (!validateHmacSignature(rawBody, signature, appSecret)) {
    console.warn('Facebook webhook: invalid HMAC signature');
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let payload: FacebookWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Process only leadgen changes — acknowledge everything else immediately
  if (payload.object !== 'page') {
    return NextResponse.json({ ok: true });
  }

  const leadgenEntries = payload.entry
    ?.flatMap((e) => e.changes ?? [])
    .filter((c) => c.field === 'leadgen') ?? [];

  for (const change of leadgenEntries) {
    const { leadgen_id, page_id, form_id } = change.value;
    if (!leadgen_id) continue;

    try {
      await processLeadgenEvent({ leadgen_id, page_id, form_id });
    } catch (err) {
      // Log but never let one failure block the 200 response — Meta retries on non-2xx
      console.error(`Failed to process leadgen_id=${leadgen_id}:`, err);
    }
  }

  return NextResponse.json({ ok: true });
}

// ── Core processing ───────────────────────────────────────────────────────────

async function processLeadgenEvent({
  leadgen_id,
  page_id,
  form_id,
}: {
  leadgen_id: string;
  page_id?: string;
  form_id?: string;
}) {
  // Fetch lead field data from Graph API
  let pageToken: string;
  try {
    pageToken = env('META_PAGE_ACCESS_TOKEN');
  } catch {
    throw new Error('META_PAGE_ACCESS_TOKEN not configured — cannot fetch lead data');
  }

  const graphUrl = `https://graph.facebook.com/v21.0/${leadgen_id}?access_token=${pageToken}`;
  const graphRes = await fetch(graphUrl);
  if (!graphRes.ok) {
    const body = await graphRes.text();
    throw new Error(`Graph API error ${graphRes.status}: ${body}`);
  }

  const leadData: GraphLeadgenResponse = await graphRes.json();
  const fd = leadData.field_data ?? [];

  // Extract fields — Meta uses various field name conventions
  const fullName = extractField(fd, 'full_name', 'name', 'full name') ?? null;
  const email = extractField(fd, 'email') ?? null;
  const phone = extractField(fd, 'phone_number', 'phone', 'mobile_number') ?? null;

  // Insert with leadgen_id as idempotency key — UNIQUE constraint prevents duplicates
  const { error: insertError } = await supabaseAdmin.from('retail_leads').insert({
    lead_type: 'facebook_lead',
    name: fullName,
    email,
    phone,
    source: 'facebook',
    leadgen_id,
    page_id: page_id ?? null,
    form_id: form_id ?? leadData.form_id ?? null,
    status: 'new',
  });

  if (insertError) {
    if (insertError.code === '23505') {
      // Duplicate leadgen_id — already processed, skip silently
      console.log(`leadgen_id=${leadgen_id} already exists — skipping`);
      return;
    }
    throw new Error(`DB insert failed: ${insertError.message}`);
  }

  console.log(`Inserted Facebook lead: leadgen_id=${leadgen_id} email=${email ?? 'none'}`);

  // Auto-reply — only if we have an email address
  if (!email) {
    console.log(`leadgen_id=${leadgen_id}: no email address, skipping auto-reply`);
    return;
  }

  const firstName = fullName ? fullName.split(/\s+/)[0] : null;
  const sent = await sendFacebookLeadAutoReply(email, firstName);

  if (sent.success) {
    await supabaseAdmin
      .from('retail_leads')
      .update({ status: 'replied', replied_at: new Date().toISOString() })
      .eq('leadgen_id', leadgen_id);
    console.log(`Auto-reply sent to ${email} (leadgen_id=${leadgen_id})`);
  } else {
    console.error(`Auto-reply failed for ${email}: ${sent.error} — status remains 'new'`);
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface FacebookWebhookPayload {
  object: string;
  entry?: Array<{
    id: string;
    time: number;
    changes?: Array<{
      field: string;
      value: {
        leadgen_id: string;
        page_id?: string;
        form_id?: string;
        ad_id?: string;
        adgroup_id?: string;
      };
    }>;
  }>;
}

interface GraphLeadgenResponse {
  id: string;
  created_time?: number;
  ad_id?: string;
  form_id?: string;
  field_data: Array<{
    name: string;
    values: string[];
  }>;
}
