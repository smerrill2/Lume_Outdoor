import { NextResponse } from 'next/server';
import { hasValidAdminSession } from '@/lib/adminSession';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* Allow the login page and auth API through */
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  /* All other admin pages and admin APIs require a valid session cookie */
  if (!hasValidAdminSession(request)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/proposals/:path*'],
};
