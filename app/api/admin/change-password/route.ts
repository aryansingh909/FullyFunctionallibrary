import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth';
import { changePasswordSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyAdminToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Validation failed' },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    const { data: adminUser } = await supabaseAdmin
      .from('admin_users')
      .select('id, password_hash')
      .eq('id', payload.sub)
      .maybeSingle();

    if (!adminUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const currentMatch = await bcrypt.compare(currentPassword, adminUser.password_hash);
    if (!currentMatch) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const newHash = await bcrypt.hash(newPassword, 12);
    const { error } = await supabaseAdmin
      .from('admin_users')
      .update({ password_hash: newHash })
      .eq('id', adminUser.id);

    if (error) throw error;

    // Invalidate current session
    const response = NextResponse.json({ success: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
