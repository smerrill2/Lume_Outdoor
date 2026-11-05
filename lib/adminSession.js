/* Shared admin session check — used by middleware and admin API routes */
export const ADMIN_SESSION_COOKIE = 'admin_session';

export function hasValidAdminSession(request) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const expectedToken = process.env.ADMIN_SESSION_TOKEN;

  return Boolean(sessionToken && expectedToken && sessionToken === expectedToken);
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized.' }, { status: 401 });
}
