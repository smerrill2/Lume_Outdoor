import { createServiceClient } from '@/lib/supabase';
import { hasValidAdminSession, unauthorizedResponse } from '@/lib/adminSession';

/* ── List all consultation submissions (admin only) ── */
export async function GET(request) {
  if (!hasValidAdminSession(request)) {
    return unauthorizedResponse();
  }

  const supabase = createServiceClient();
  const { data: submissions, error } = await supabase
    .from('consultation_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch submissions:', error);
    return Response.json({ error: 'Failed to fetch submissions.' }, { status: 500 });
  }

  return Response.json({ submissions: submissions || [] });
}
