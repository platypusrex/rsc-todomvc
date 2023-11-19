'use client';

import React, { ChangeEventHandler, useRef } from 'react';
import { updateTodo } from '~/actions/updateTodo';
import { deleteTodo } from '~/actions/deleteTodo';
import { todos } from '~/db/schema';
import { InferSelectModel } from 'drizzle-orm';

type TodoProps = {
  todo: InferSelectModel<typeof todos>;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleChange: ChangeEventHandler = () => {
    submitBtnRef.current?.click?.();
  };

  return (
    <li
      key={todo.id}
      className="border-b-solid group relative flex min-h-[60px] items-center
        border-b border-b-gray-100 py-2 pl-3 pr-7 tracking-tight"
    >
      <form className="flex" action={updateTodo.bind(null, todo.id)}>
        <input
          onChange={handleChange}
          type="checkbox"
          name="status"
          checked={todo.status === 'completed'}
          className="mr-5 h-4 w-4 rounded border-gray-300
            bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500
            dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800
            dark:focus:ring-blue-600"
        />
        <button hidden type="submit" ref={submitBtnRef} />
      </form>
      <span
        className={`text-[22px]
         ${todo.status === 'completed' ? 'text-gray-300 line-through' : 'text-gray-500'}`}
      >
        {todo.message}
      </span>
      <form
        className="absolute right-3 flex h-full items-center"
        action={deleteTodo.bind(null, todo.id)}
      >
        <button
          type="submit"
          className="h-fit text-3xl
           text-gray-400 hover:text-gray-600 group-hover:after:content-['×']"
        />
      </form>
    </li>
  );
};
