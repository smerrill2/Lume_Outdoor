import { createClient } from '@supabase/supabase-js';

/* Server-side client with service role key (for admin operations).
   Server code only — consultation data has no anon access, so the browser
   reads it through the admin API routes instead of querying Supabase directly. */
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
