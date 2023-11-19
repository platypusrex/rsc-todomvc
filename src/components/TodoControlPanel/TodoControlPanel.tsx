import React from 'react';
import Link from 'next/link';
import { InferSelectModel } from 'drizzle-orm';
import { todos } from '~/db/schema';

const CONTROL_LINKS = [
  { href: '/?status=all', name: 'All', value: 'all' },
  { href: '/?status=active', name: 'Active', value: 'active' },
  { href: '/?status=completed', name: 'Completed', value: 'completed' },
] as const;

type TodoControlPanelProps = {
  status?: 'all' | 'active' | 'completed';
  todos: InferSelectModel<typeof todos>[];
};

export const TodoControlPanel: React.FC<TodoControlPanelProps> = ({ status, todos }) => {
  const activeItems = todos.filter((todo) => todo.status === 'active');
  return (
    <>
      <p>{activeItems.length} items left</p>
      <ul className="my-1 flex gap-2">
        {CONTROL_LINKS.map(({ name, href, value }) => {
          return (
            <li key={name}>
              <Link
                className={`rounded border border-solid px-1.5 py-1
                ${
                  status === value ? 'border-gray-300' : 'border-transparent hover:border-gray-200'
                }`}
                href={href}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
