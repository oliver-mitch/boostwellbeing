import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const PatchSessionSchema = z.object({
  refinements: z.record(z.string(), z.unknown()).optional(),
  calculations: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['draft', 'calculated', 'refined', 'soa_generated']).optional(),
  soa_generated_at: z.string().datetime().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from('protection_sessions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body: unknown = await request.json();
    const parsed = PatchSessionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (parsed.data.refinements !== undefined) updates.refinements = parsed.data.refinements;
    if (parsed.data.calculations !== undefined) updates.calculations = parsed.data.calculations;
    if (parsed.data.status !== undefined) updates.status = parsed.data.status;
    if (parsed.data.soa_generated_at !== undefined) updates.soa_generated_at = parsed.data.soa_generated_at;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabaseAdmin
      .from('protection_sessions')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('protection_sessions update error:', error);
      return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
