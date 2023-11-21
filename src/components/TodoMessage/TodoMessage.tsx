'use client';

import React, { MouseEventHandler, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { updateTodoMessage } from '~/actions/updateTodoMessage';
import { useOutsideClick } from '~/hooks/useClickOutside';
import { SubmitButton } from '~/components/SubmitButton';
import { Todo } from '~/db/schema';

type TodoMessageProps = {
  todo: Todo;
};

export const TodoMessage: React.FC<TodoMessageProps> = ({ todo }) => {
  const [formState, formAction] = useFormState(updateTodoMessage, { todo, status: 'pending' });
  const [readonly, setReadOnly] = useState(true);
  const [message, setMessage] = useState(() => formState.todo.message);

  const formRef = useRef<HTMLFormElement>(null);
  const messageInputRef = useOutsideClick(() => {
    formRef.current?.requestSubmit();
    setReadOnly(true);
  });

  const handleDoubleClick: MouseEventHandler = (e) => {
    if (!readonly) return;
    setReadOnly(false);
  };

  return (
    <form className="flex-1" ref={formRef} action={formAction}>
      {readonly ? (
        <p
          className={`relative h-full w-full py-5 pl-4 pr-8 text-[22px] leading-[1.2] ${
            todo.status === 'completed' ? 'text-gray-300 line-through' : 'text-gray-500'
          }`}
          onDoubleClick={handleDoubleClick}
        >
          {message}
        </p>
      ) : (
        <input
          type="text"
          name="message"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          ref={messageInputRef}
          defaultValue={formState.todo.message}
          className="relative z-10 h-full w-full border-none px-4 py-5 text-[22px]
         leading-[1.25] -tracking-[0.4px] shadow-[inset_0_0_5px_#666] outline-none [font-stretch:0%]"
        />
      )}
      <SubmitButton hidden />
    </form>
  );
};
