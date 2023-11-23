import React from 'react';
import { LogoutButton } from '~/components/LogoutButton';

export const Footer: React.FC = () => (
  <div className="flex flex-col gap-1.5 w-full items-center mt-16">
    <p className="text-[10px] text-gray-300">Double-click to edit a todo</p>
    <p className="text-[10px] text-gray-300">
      Created by{' '}
      <a className="text-gray-400 hover:underline" href="https://github.com/platypusrex">
        Frank Cooke
      </a>
    </p>
    <p className="text-[10px] text-gray-300">
      In homage to {' '}
      <a className="text-gray-400 hover:underline" href="https://todomvc.com/">
        TodoMVC
      </a>
    </p>
    <LogoutButton />
  </div>
);
