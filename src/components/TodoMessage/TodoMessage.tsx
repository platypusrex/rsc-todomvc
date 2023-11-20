'use client';

import React, { MouseEventHandler, useRef, useState } from 'react';
import { updateTodoMessage } from '~/actions/updateTodoMessage';
import { useOutsideClick } from '~/hooks/useClickOutside';
import { Todo } from '~/db/schema';

type TodoMessageProps = {
  todo: Todo;
};

export const TodoMessage: React.FC<TodoMessageProps> = ({ todo }) => {
  const [readonly, setReadOnly] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);
  const messageInputRef = useOutsideClick(() => {
    setReadOnly(true);
    formRef.current?.requestSubmit();
  });

  const handleDoubleClick: MouseEventHandler = (e) => {
    if (!readonly) return;
    setReadOnly(false);
    messageInputRef.current?.focus?.();
  };

  return (
    <form className="flex-1" ref={formRef} action={updateTodoMessage.bind(null, todo.id)}>
      <input
        type="text"
        name="message"
        ref={messageInputRef}
        readOnly={readonly}
        onDoubleClick={handleDoubleClick}
        defaultValue={todo.message}
        className={`relative h-full min-h-[60px] w-full px-4 text-[22px] outline-none
            ${readonly ? 'shadow-none' : 'z-10 shadow-[inset_0_0_5px_#666]'}
            ${
          todo.status === 'completed'
            ? `${readonly ? 'line-through text-gray-300' : 'no-underline text-gray-500'}`
            : 'text-gray-500'
        }`}
      />
      <button type="submit" />
    </form>
  );
}
