import React from 'react';
import { deleteTodo } from '~/actions/deleteTodo';
import { SubmitButton } from '~/components/SubmitButton';
import { Todo } from '~/db/schema';

type DeleteTodoProps = {
  todo: Todo;
};

export const DeleteTodo: React.FC<DeleteTodoProps> = ({ todo }) => (
  <form
    className="absolute right-3 flex h-full items-center"
    action={deleteTodo.bind(null, todo.id)}
  >
    <SubmitButton className="h-fit text-3xl text-gray-400 hover:text-gray-600 group-hover:after:content-['×']" />
  </form>
);
