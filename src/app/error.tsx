'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex flex-col h-screen w-full max-w-[420px] text-center mx-auto items-center justify-center">
          <h2 className="text-4xl font-bold">Something went wrong!</h2>
          <p className="text-lg mt-2 text-gray-400 font-light">{error.message}</p>
          <Link
            href='/'
            onClick={reset}
            className="rounded border border-solid border-gray-300
             px-10 py-2 mt-3 hover:bg-gray-100 transition duration-200"
          >
            Go back
          </Link>
        </main>
      </body>
    </html>
  );
}
