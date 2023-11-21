'use client';

import React, { ChangeEventHandler, useRef, useOptimistic, useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { updateTodoStatus } from '~/actions/updateTodoStatus';
import { SubmitButton } from '~/components/SubmitButton';
import { Todo } from '~/db/schema';

type TodoStatusProps = {
  todo: Todo;
};

export const TodoStatus: React.FC<TodoStatusProps> = ({ todo }) => {
  const [, formAction] = useFormState(updateTodoStatus, todo.id)
  const statusSubmitBtnRef = useRef<HTMLButtonElement>(null);
  const [, startTransition] = useTransition()
  const [optimisticTodo, addOptimisticStatus] = useOptimistic<Todo, Todo['status']>(
    todo,
    (state, status) => ({
      ...state,
      status
    })
  );

  // this useEffect is a total hack
  // it's only way I found to keep the todo and optimistic todo
  //  in sync with the toggle todos form
  useEffect(() => {
    if (todo.status !== optimisticTodo.status) {
      startTransition(() => {
        addOptimisticStatus(todo.status)
      });
    }
    // eslint-disable-next-line
  }, [todo.status]);

  const handleChange: ChangeEventHandler = () => {
    statusSubmitBtnRef.current?.click?.();
  };

  return (
    <form className="flex" action={(formData) => {
      const checkboxState = formData.get('status');
      const status = checkboxState === 'on' ? 'completed' : 'active';
      addOptimisticStatus(status)
      formAction(formData)
    }}>
      <input
        onChange={handleChange}
        type="checkbox"
        name="status"
        checked={optimisticTodo.status === 'completed'}
        className="mr-3 h-4 w-4 rounded border-gray-300
          bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500
          dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800
          dark:focus:ring-blue-600"
      />
      <SubmitButton hidden ref={statusSubmitBtnRef} />
    </form>
  );
}
