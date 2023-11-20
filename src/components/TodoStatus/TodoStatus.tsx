'use client';

import React, { ChangeEventHandler, useRef } from 'react';
import { updateTodoStatus } from '~/actions/updateTodoStatus';
import { Todo } from '~/db/schema';

type TodoStatusProps = {
  todo: Todo;
};

export const TodoStatus: React.FC<TodoStatusProps> = ({ todo }) => {
  const statusSubmitBtnRef = useRef<HTMLButtonElement>(null);

  const handleChange: ChangeEventHandler = () => {
    statusSubmitBtnRef.current?.click?.();
  };

  return (
    <form className="flex" action={updateTodoStatus.bind(null, todo.id)}>
      <input
        onChange={handleChange}
        type="checkbox"
        name="status"
        checked={todo.status === 'completed'}
        className="mr-3 h-4 w-4 rounded border-gray-300
          bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500
          dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800
          dark:focus:ring-blue-600"
      />
      <button hidden type="submit" ref={statusSubmitBtnRef} />
    </form>
  );
}
