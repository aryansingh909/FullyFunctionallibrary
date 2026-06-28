import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// One-time admin seeding endpoint.
// Only works when no admin user exists yet.
// Remove or disable after first use in production.
export async function POST(request: NextRequest) {
  try {
    const { count } = await supabaseAdmin
      .from('admin_users')
      .select('*', { count: 'exact', head: true });

    if ((count ?? 0) > 0) {
      return NextResponse.json(
        { error: 'Admin account already exists. This endpoint is disabled.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Email and password (min 8 chars) are required' },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 12);
    const { error } = await supabaseAdmin
      .from('admin_users')
      .insert({ email, password_hash: hash });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Admin account created.' });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
