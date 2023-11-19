import React from 'react';
import { InferSelectModel } from 'drizzle-orm';
import { archiveCompletedTodos } from '~/actions/archiveCompletedTodos';
import { todos } from '~/db/schema';

type ArchiveTodoProps = {
  todos: InferSelectModel<typeof todos>[];
};

export const ArchiveTodo: React.FC<ArchiveTodoProps> = ({ todos }) => {
  const hasCompleted = !!todos.find((todo) => todo.status === 'completed');
  return (
    <form action={archiveCompletedTodos}>
      <button
        type="submit"
        className={`border-b-solid border-b border-b-transparent
          leading-3 hover:border-b-gray-600 ${!hasCompleted ? 'invisible' : 'visible'}`}
      >
        Clear completed
      </button>
    </form>
  );
};
