import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { env } from '~/config/environment';
import { db } from '~/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google({ clientSecret: env.GOOGLE_CLIENT_SECRET, clientId: env.GOOGLE_CLIENT_ID }),
  ],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
