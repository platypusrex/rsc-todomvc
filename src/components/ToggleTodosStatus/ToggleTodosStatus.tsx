import React from 'react';
import { toggleTodos } from '~/actions/toggleTodos';
import type { Todo } from '~/db/schema';
import { SubmitButton } from '~/components/SubmitButton';

type MappedTodos = {
  completed: string[];
  active: string[];
};

type ToggleTodosStatusProps = {
  todos: Todo[];
};

export const ToggleTodosStatus: React.FC<ToggleTodosStatusProps> = ({ todos }) => {
  const mappedTodos = todos.reduce<MappedTodos>(
    (todoMap, todo) => {
      const { status, id } = todo;
      if (status === 'completed' || status === 'active') todoMap[status] = [...todoMap[status], id];
      return todoMap;
    },
    { completed: [], active: [] }
  );

  const completed = !!(mappedTodos.completed.length && !mappedTodos.active.length);

  return (
    <form
      action={toggleTodos.bind(null, {
        status: !completed ? 'completed' : 'active',
        ids: !completed ? mappedTodos.active : mappedTodos.completed,
      })}
    >
      <SubmitButton
        className={`h-10 w-10 text-[22px] before:inline-block before:rotate-90 before:content-['❯'] ${
          completed ? 'text-gray-500' : 'text-gray-200'
        }`}
      />
    </form>
  );
};
