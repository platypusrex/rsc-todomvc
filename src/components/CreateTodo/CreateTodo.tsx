'use client';

import React, { useRef } from 'react';
import { createTodo } from '~/actions/createTodo';

export const CreateTodo: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (formData: FormData) => {
    await createTodo(formData);
    formRef.current?.reset?.();
  };

  return (
    <form className="ml-3 w-full" ref={formRef} action={handleFormSubmit}>
      <input
        name="todo"
        type="text"
        placeholder="What needs to be done?"
        className="w-full text-2xl font-extralight placeholder-gray-200 outline-none placeholder:italic"
      />
    </form>
  );
};
