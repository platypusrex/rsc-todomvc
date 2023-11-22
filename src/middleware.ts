import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth((req) => {
  const status = req.nextUrl.searchParams.get('status');
  if (!status) {
    return NextResponse.redirect(new URL('/?status=all', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
