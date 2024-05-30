import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getCookieKeyValue } from './app/lib/util';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login') {
    return NextResponse.next();
  }

  const password = process.env.APP_PASSWORD;

  if (!password) {
    return NextResponse.next();
  }

  const authCookie = cookies().get('auth')?.value;
  const expectedAuthCookie = await getCookieKeyValue(password);

  if (!authCookie || authCookie !== expectedAuthCookie) {
    return redirectToLogin(request.url);
  }

  return NextResponse.next();
}

function redirectToLogin(url: string) {
  return NextResponse.redirect(new URL('/login', url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
