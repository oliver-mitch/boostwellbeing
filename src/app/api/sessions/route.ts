import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const CreateSessionSchema = z.object({
  inputs: z.record(z.string(), z.unknown()),
  calculations: z.record(z.string(), z.unknown()),
  status: z.enum(['draft', 'calculated', 'refined', 'soa_generated']).default('calculated'),
});

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = CreateSessionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { inputs, calculations, status } = parsed.data;
    const userAgent = request.headers.get('user-agent') ?? null;

    const { data, error } = await supabaseAdmin
      .from('protection_sessions')
      .insert({ inputs, calculations, status, user_agent: userAgent })
      .select('id')
      .single();

    if (error) {
      console.error('protection_sessions insert error:', error);
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
