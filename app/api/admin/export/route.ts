import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Inquiry } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function toCSV(rows: Inquiry[]): string {
  if (rows.length === 0) return '';

  const headers = [
    'ID', 'Type', 'Name', 'Phone', 'Email', 'Address', 'Programme',
    'Plan', 'Preferred Timing', 'Qualification', 'Preferred Callback',
    'Specialization', 'Message', 'Status', 'Notes', 'Created At',
  ];

  const escape = (v: unknown) => {
    const s = v === undefined || v === null ? '' : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };

  const dataRows = rows.map(r => [
    r.id, r.type, r.name, r.phone, r.email ?? '', r.address ?? '',
    r.programme ?? '', r.plan ?? '', r.preferred_timing ?? '',
    r.highest_qualification ?? '', r.preferred_callback ?? '',
    r.specialization ?? '', r.message ?? '', r.status, r.notes ?? '',
    new Date(r.created_at).toLocaleString('en-IN'),
  ].map(escape).join(','));

  return [headers.map(h => `"${h}"`).join(','), ...dataRows].join('\n');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (type && type !== 'all') query = query.eq('type', type);
    if (status && status !== 'all') query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw error;

    const csv = toCSV(data ?? []);
    const filename = `srs-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('Export error:', err);
    return NextResponse.json({ error: 'Failed to export' }, { status: 500 });
  }
}
