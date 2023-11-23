import React from 'react';
import { signOut } from '~/auth';
import { SubmitButton } from '~/components/SubmitButton';

export const LogoutButton: React.FC = () => (
  <form
    action={async () => {
      'use server';
      await signOut();
    }}
  >
    <SubmitButton className="border border-solid border-gray-300 bg-white px-2 py-0.5">
      <span className="flex items-center gap-2 text-xs text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3 w-3 rotate-90 text-gray-600"
        >
          <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
        logout
      </span>
    </SubmitButton>
  </form>
);
