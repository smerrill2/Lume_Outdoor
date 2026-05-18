import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* Allow the login page and auth API through */
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  /* All other /admin routes require a valid session cookie */
  const sessionToken = request.cookies.get('admin_session')?.value;
  const expectedToken = process.env.ADMIN_SESSION_TOKEN;

  if (!sessionToken || sessionToken !== expectedToken) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
