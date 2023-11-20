import React from 'react';
import { deleteTodo } from '~/actions/deleteTodo';
import { Todo } from '~/db/schema';

type DeleteTodoProps = {
  todo: Todo;
};

export const DeleteTodo: React.FC<DeleteTodoProps> = ({ todo }) => (
  <form
    className="absolute right-3 flex h-full items-center"
    action={deleteTodo.bind(null, todo.id)}
  >
    <button
      type="submit"
      className="h-fit text-3xl text-gray-400 hover:text-gray-600
       group-hover:after:content-['×']"
    />
  </form>
);
