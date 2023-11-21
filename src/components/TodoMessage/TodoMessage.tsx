'use client';

import React, { MouseEventHandler, useRef, useState } from 'react';
import { updateTodoMessage } from '~/actions/updateTodoMessage';
import { useOutsideClick } from '~/hooks/useClickOutside';
import { Todo } from '~/db/schema';
import { SubmitButton } from '~/components/SubmitButton';

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

  if (readonly) {
    return (
      <p
        className={`relative h-full w-full pl-4 pr-8 py-5 text-[22px] leading-[1.2] ${
          todo.status === 'completed' ? 'text-gray-300 line-through' : 'text-gray-500'
        }`}
        onDoubleClick={handleDoubleClick}
      >
        {todo.message}
      </p>
    );
  }

  return (
    <form className="flex-1" ref={formRef} action={updateTodoMessage.bind(null, todo.id)}>
      <input
        type="text"
        name="message"
        ref={messageInputRef}
        defaultValue={todo.message}
        className="relative z-10 h-full w-full border-none px-4 py-5 -tracking-[0.4px]
         text-[22px] leading-[1.25] shadow-[inset_0_0_5px_#666] outline-none [font-stretch:0%]"
      />
      <SubmitButton hidden />
    </form>
  );
};
