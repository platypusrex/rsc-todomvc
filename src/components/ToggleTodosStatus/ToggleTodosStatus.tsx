import React from 'react';
import { toggleTodos } from '~/actions/toggleTodos';
import type { Todo } from '~/db/schema';

type MappedTodos = {
  completed: string[];
  active: string[];
};

type ToggleTodosStatusProps = {
  todos: Todo[];
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
