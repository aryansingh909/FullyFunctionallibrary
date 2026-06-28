import { NextRequest, NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';
import {
  libraryInquirySchema,
  enrollmentInquirySchema,
  generalContactSchema,
} from '@/lib/validation';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type FormType = 'library' | 'enrollment' | 'general';

const schemaMap: Record<FormType, z.ZodTypeAny> = {
  library: libraryInquirySchema,
  enrollment: enrollmentInquirySchema,
  general: generalContactSchema,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...fields } = body;

    if (!type || !['library', 'enrollment', 'general'].includes(type)) {
      return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    const schema = schemaMap[type as FormType];
    const parsed = schema.safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot check
    if (parsed.data.website) {
      return NextResponse.json({ success: true }); // silently discard bots
    }

    // Strip honeypot before saving
    const { website: _honeypot, ...cleanData } = parsed.data as { website?: string; [key: string]: unknown };

    const { error } = await supabasePublic.from('inquiries').insert({
      type,
      ...cleanData,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }
}
