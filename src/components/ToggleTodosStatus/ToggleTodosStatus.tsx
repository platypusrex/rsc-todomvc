import React from 'react';
import { InferSelectModel } from 'drizzle-orm';
import { todos } from '~/db/schema';
import { toggleTodos } from '~/actions/toggleTodos';

type MappedTodos = {
  completed: string[];
  active: string[];
};

type ToggleTodosStatusProps = {
  todos: InferSelectModel<typeof todos>[];
};

export const ToggleTodosStatus: React.FC<ToggleTodosStatusProps> = ({ todos }) => {
  const mappedTodos = todos.reduce<MappedTodos>(
    (acc, curr) => {
      if (curr.status === 'completed' || curr.status === 'active') {
        acc[curr.status] = [...acc[curr.status], curr.id];
      }
      return acc;
    },
    { completed: [], active: [] }
  );

  const allCompleted = !!(mappedTodos.completed.length && !mappedTodos.active.length);

  return (
    <form
      action={toggleTodos.bind(null, {
        status: !allCompleted ? 'completed' : 'active',
        ids: !allCompleted ? mappedTodos.active : mappedTodos.completed,
      })}
    >
      <button
        type="submit"
        className={`mr-5 rotate-90 text-[22px] before:content-['❯'] 
          ${allCompleted ? 'text-gray-500' : 'text-gray-200'}`}
      />
    </form>
  );
};
