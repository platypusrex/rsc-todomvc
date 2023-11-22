import React from 'react';
import { signOut } from '~/auth';
import { SubmitButton } from '~/components/SubmitButton';

export const LogoutButton: React.FC = () => (
  <form
    className="absolute right-2 top-2"
    action={async () => {
      'use server';
      await signOut();
    }}
  >
    <SubmitButton
      className="border border-solid border-gray-300 bg-white px-2 py-1 text-sm text-gray-600"
    >
      logout
    </SubmitButton>
  </form>
);
