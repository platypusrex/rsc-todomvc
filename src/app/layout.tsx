import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';
import './globals.css';
import { Loading } from '~/components/Loading';

const inter = Albert_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js - RSC - TodoMVC',
  description: 'TodoMVC with React server components and server actions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
