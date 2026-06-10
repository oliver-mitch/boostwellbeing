import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Server-side access scoping for the client portal.
//
// A portal_users row may carry a `client_scope` slug (e.g. 'tcs'). When set,
// that user is locked to their own client page (/portal/clients/<slug>) and
// cannot reach any other portal route — including the Wellbeing rate card at
// /portal/plan-selector. Enforced here (before the route/its bundle loads),
// not just client-side, so the rate-card data is never served to them.
//
// Users with no client_scope (staff / admins) are unaffected and pass through.

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Never gate the auth endpoints or the login page itself.
  if (pathname.startsWith('/portal/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const scope = token?.clientScope as string | null | undefined;

  // Not a scoped user → behave exactly as before (client-side guards apply).
  if (!token || !scope) {
    return NextResponse.next();
  }

  const allowedRoot = `/portal/clients/${scope}`;
  const isAllowed = pathname === allowedRoot || pathname.startsWith(`${allowedRoot}/`);

  if (!isAllowed) {
    return NextResponse.redirect(new URL(allowedRoot, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on portal pages and the NextAuth API (the latter is short-circuited above).
  matcher: ['/portal/:path*', '/api/auth/:path*'],
};
