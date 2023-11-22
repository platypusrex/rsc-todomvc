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
  const statusSubmitBtnRef = useRef<HTMLButtonElement>(null);

  const [, formAction] = useFormState(updateTodoStatus, todo.id);
  const [, startTransition] = useTransition();

  const [optimisticTodo, addOptimisticStatus] = useOptimistic<Todo, Todo['status']>(
    todo,
    (state, status) => ({
      ...state,
      status,
    })
  );

  // this useEffect is a hack in an attempt to keep the
  // todo and optimistic todo in sync with the toggle todos form
  useEffect(() => {
    if (todo.status !== optimisticTodo.status) {
      startTransition(() => {
        addOptimisticStatus(todo.status);
      });
    }
    // eslint-disable-next-line
  }, [todo.status]);

  const handleChange: ChangeEventHandler = () => {
    statusSubmitBtnRef.current?.click?.();
  };

  return (
    <form
      className="flex"
      action={(formData) => {
        const checkboxState = formData.get('status');
        const status = checkboxState === 'on' ? 'completed' : 'active';
        addOptimisticStatus(status);
        formAction(formData);
      }}
    >
      <label
        htmlFor="todo-status"
        className={`${
          optimisticTodo.status === 'completed' ? 'toggle-input-on' : 'toggle-input-off'
        } relative h-[35px] w-[38px] bg-[center_left] bg-no-repeat`}
      >
        <input
          id="todo-status"
          onChange={handleChange}
          type="checkbox"
          name="status"
          checked={optimisticTodo.status === 'completed'}
          className="absolute inset-0 z-[1] mr-3 h-[35px] w-[38px] rounded opacity-0"
        />
      </label>
      <SubmitButton hidden ref={statusSubmitBtnRef} />
    </form>
  );
};
