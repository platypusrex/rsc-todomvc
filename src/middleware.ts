import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    const status = request.nextUrl.searchParams.get('status');
    if (!status) {
      return NextResponse.redirect(new URL('/?status=all', request.url));
    }
  }
}

export const config = {
  matcher: '/',
};
