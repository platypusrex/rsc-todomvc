import React from 'react';
import { archiveCompletedTodos } from '~/actions/archiveCompletedTodos';
import { SubmitButton } from '~/components/SubmitButton';
import type { Todo } from '~/db/schema';

type ArchiveTodoProps = {
  todos: Todo[];
};

export const ArchiveTodo: React.FC<ArchiveTodoProps> = ({ todos }) => {
  const hasCompleted = !!todos.find((todo) => todo.status === 'completed');
  return (
    <form action={archiveCompletedTodos}>
      <SubmitButton
        className={`border-b-solid border-b border-b-transparent
          leading-3 hover:border-b-gray-600 ${!hasCompleted ? 'invisible' : 'visible'}`}
      >
        Clear completed
      </SubmitButton>
    </form>
  );
};
