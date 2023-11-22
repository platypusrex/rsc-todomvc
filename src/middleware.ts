import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status');
  if (!status) {
    return NextResponse.redirect(new URL('/?status=all', request.url));
  }
}

export const config = {
  matcher: '/',
};
