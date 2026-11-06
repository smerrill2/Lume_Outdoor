import { createServiceClient } from '@/lib/supabase';

/* ── Keep the free-tier Supabase project awake ──
   Supabase pauses free projects after 7 days without activity. Vercel Cron
   hits this route daily (see vercel.json) and it runs a read-only count query,
   which counts as activity without writing anything or triggering lead emails. */
export async function GET(request) {
  /* Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET is set */
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from('consultation_submissions')
    .select('id', { count: 'exact', head: true });

  if (error) {
    console.error('Supabase keepalive query failed:', error);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true, pingedAt: new Date().toISOString() });
}
