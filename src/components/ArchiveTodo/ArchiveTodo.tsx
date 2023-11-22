import React from 'react';
import { archiveCompletedTodos } from '~/actions/archiveCompletedTodos';
import { SubmitButton } from '~/components/SubmitButton';
import type { Todo } from '~/db/schema';

type ArchiveTodoProps = {
  todos: Todo[];
};

export const ArchiveTodo: React.FC<ArchiveTodoProps> = ({ todos }) => {
  const hasCompletedTodos = !!todos.find((todo) => todo.status === 'completed');
  return (
    <form action={archiveCompletedTodos}>
      <SubmitButton
        className={`border-b-solid border-b border-b-transparent text-gray-600
          leading-[0.85rem] hover:border-b-gray-700 ${!hasCompletedTodos ? 'invisible' : 'visible'}`}
      >
        Clear completed
      </SubmitButton>
    </form>
  );
};
