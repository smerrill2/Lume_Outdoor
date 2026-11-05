import { createServiceClient } from '@/lib/supabase';
import { hasValidAdminSession, unauthorizedResponse } from '@/lib/adminSession';

/* ── Fetch a single consultation submission (admin only) ── */
export async function GET(request, { params }) {
  if (!hasValidAdminSession(request)) {
    return unauthorizedResponse();
  }

  const { id } = await params;
  const supabase = createServiceClient();
  const { data: submission, error } = await supabase
    .from('consultation_submissions')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch submission:', error);
    return Response.json({ error: 'Failed to fetch submission.' }, { status: 500 });
  }

  if (!submission) {
    return Response.json({ error: 'Submission not found.' }, { status: 404 });
  }

  return Response.json({ submission });
}
