import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validation';

// Force dynamic rendering - prevent static optimization
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

async function getRecentFailures(identifier: string): Promise<number> {
  console.log('[LOGIN STEP] getRecentFailures for:', identifier);
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
  const { count, error } = await supabaseAdmin
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('identifier', identifier)
    .eq('success', false)
    .gte('created_at', since);

  if (error) {
    console.error('[LOGIN STEP ERROR] getRecentFailures:', error);
    return 0;
  }

  console.log('[LOGIN STEP] getRecentFailures result:', count);
  return count ?? 0;
}

async function recordAttempt(identifier: string, success: boolean): Promise<void> {
  console.log('[LOGIN STEP] recordAttempt:', identifier, 'success:', success);
  const { error } = await supabaseAdmin.from('login_attempts').insert({ identifier, success });
  if (error) {
    console.error('[LOGIN STEP ERROR] recordAttempt:', error);
  }
}

export async function POST(request: NextRequest) {
  console.log('[LOGIN START] ===== ADMIN LOGIN REQUEST =====');
  console.log('[LOGIN STEP] Request URL:', request.url);
  console.log('[LOGIN STEP] Request method:', request.method);

  try {
    // Step 1: Parse body
    console.log('[LOGIN STEP 1] Parsing request body...');
    let body;
    try {
      body = await request.json();
      console.log('[LOGIN STEP 1] Body parsed, email:', body?.email);
    } catch (parseError) {
      console.error('[LOGIN STEP 1 ERROR] Failed to parse body:', parseError);
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Step 2: Validate input
    console.log('[LOGIN STEP 2] Validating with zod schema...');
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      console.error('[LOGIN STEP 2 ERROR] Validation failed:', parsed.error.errors);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 400 }
      );
    }
    console.log('[LOGIN STEP 2] Validation passed');

    const { email, password } = parsed.data;
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const identifier = `${ip}:${email}`;
    console.log('[LOGIN STEP] Identifier:', identifier);

    // Step 3: Check rate limit
    console.log('[LOGIN STEP 3] Checking rate limit...');
    const failures = await getRecentFailures(identifier);
    console.log('[LOGIN STEP 3] Failed attempts in window:', failures);
    if (failures >= MAX_ATTEMPTS) {
      console.log('[LOGIN STEP 3] Rate limit exceeded');
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    // Step 4: Query admin user
    console.log('[LOGIN STEP 4] Querying admin_users table...');
    console.log('[LOGIN STEP 4] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING');
    console.log('[LOGIN STEP 4] Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (len: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'MISSING');

    const { data: adminUser, error: queryError } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, password_hash')
      .eq('email', email)
      .maybeSingle();

    if (queryError) {
      console.error('[LOGIN STEP 4 ERROR] Database query error:', queryError);
      throw new Error('Database query failed: ' + queryError.message);
    }

    console.log('[LOGIN STEP 4] Query result - adminUser found:', !!adminUser);
    if (adminUser) {
      console.log('[LOGIN STEP 4] adminUser.id:', adminUser.id);
      console.log('[LOGIN STEP 4] adminUser.email:', adminUser.email);
      console.log('[LOGIN STEP 4] password_hash present:', !!adminUser.password_hash);
      console.log('[LOGIN STEP 4] password_hash length:', adminUser.password_hash?.length);
    }

    if (!adminUser) {
      console.log('[LOGIN STEP 4] No admin user found, recording failed attempt');
      await recordAttempt(identifier, false);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Step 5: Compare passwords
    console.log('[LOGIN STEP 5] Comparing passwords with bcrypt...');
    let passwordMatch;
    try {
      passwordMatch = await bcrypt.compare(password, adminUser.password_hash);
      console.log('[LOGIN STEP 5] Password comparison result:', passwordMatch);
    } catch (bcryptError) {
      console.error('[LOGIN STEP 5 ERROR] bcrypt.compare threw:', bcryptError);
      throw bcryptError;
    }

    if (!passwordMatch) {
      console.log('[LOGIN STEP 5] Password mismatch, recording failed attempt');
      await recordAttempt(identifier, false);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Step 6: Record successful attempt
    console.log('[LOGIN STEP 6] Recording successful login attempt');
    await recordAttempt(identifier, true);

    // Step 7: Update last_login_at
    console.log('[LOGIN STEP 7] Updating last_login_at timestamp');
    const { error: updateError } = await supabaseAdmin
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', adminUser.id);

    if (updateError) {
      console.error('[LOGIN STEP 7 ERROR] Failed to update last_login_at:', updateError);
      // Non-fatal, continue
    }

    // Step 8: Generate JWT
    console.log('[LOGIN STEP 8] Generating JWT token...');
    console.log('[LOGIN STEP 8] JWT_SECRET present:', !!process.env.JWT_SECRET);
    let token;
    try {
      token = await signAdminToken({ sub: adminUser.id, email: adminUser.email });
      console.log('[LOGIN STEP 8] Token generated, length:', token?.length);
    } catch (tokenError) {
      console.error('[LOGIN STEP 8 ERROR] JWT signing failed:', tokenError);
      throw tokenError;
    }

    // Step 9: Set cookie and return success
    console.log('[LOGIN STEP 9] Setting auth cookie...');
    const response = NextResponse.json({ success: true });

    console.log('[LOGIN STEP 9] Cookie settings:', {
      name: COOKIE_NAME,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('[LOGIN SUCCESS] ===== LOGIN COMPLETE =====');
    return response;
  } catch (err) {
    console.error('[LOGIN CATCH] ===== UNEXPECTED ERROR =====');
    console.error('[LOGIN CATCH] Error type:', err?.constructor?.name);
    console.error('[LOGIN CATCH] Error message:', err instanceof Error ? err.message : String(err));
    console.error('[LOGIN CATCH] Error stack:', err instanceof Error ? err.stack : 'No stack trace');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
