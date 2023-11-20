'use client';

import React, { ChangeEventHandler, MouseEventHandler, MouseEvent, useRef, useState } from 'react';
import { InferSelectModel } from 'drizzle-orm';
import { useOutsideClick } from '~/hooks/useClickOutside';
import { updateTodoStatus } from '~/actions/updateTodoStatus';
import { deleteTodo } from '~/actions/deleteTodo';
import { todos } from '~/db/schema';
import { updateTodoMessage } from '~/actions/updateTodoMessage';

type TodoProps = {
  todo: InferSelectModel<typeof todos>;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const statusSubmitBtnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const messageInputRef = useOutsideClick(
    () => {
      setReadOnly(true);
      formRef.current?.requestSubmit();
    }
  );

  const [readonly, setReadOnly] = useState(true);

  const handleChange: ChangeEventHandler = () => {
    statusSubmitBtnRef.current?.click?.();
  };

  const handleDoubleClick: MouseEventHandler = (e) => {
    if (!readonly) return;
    setReadOnly(false);
    messageInputRef.current?.focus?.();
  };

  return (
    <li
      key={todo.id}
      className="border-b-solid group relative flex min-h-[60px] items-center
        border-b border-b-gray-100 pl-3 tracking-tight"
    >
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

      <form className="flex-1" ref={formRef} action={updateTodoMessage.bind(null, todo.id)}>
        <input
          type="text"
          name="message"
          ref={messageInputRef}
          readOnly={readonly}
          onDoubleClick={handleDoubleClick}
          defaultValue={todo.message}
          className={`text-[22px] outline-none min-h-[60px] px-4 h-full w-full relative
            ${readonly ? 'shadow-none' : 'shadow-[inset_0_0_5px_#666] z-10'}
            ${todo.status === 'completed' ? 'text-gray-300 line-through' : 'text-gray-500'}`}
        />
        <button type="submit" />
      </form>

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
