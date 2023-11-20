import React from 'react';
import { getTodos } from '~/actions/getTodos';
import { CreateTodo } from '~/components/CreateTodo';
import { ToggleTodosStatus } from '~/components/ToggleTodosStatus';
import { ArchiveTodo } from '~/components/ArchiveTodo';
import { TodoControlPanel } from '~/components/TodoControlPanel';
import { TodoStatus } from '~/components/TodoStatus';
import { TodoMessage } from '~/components/TodoMessage';
import { DeleteTodo } from '~/components/DeleteTodo';

type TodoStatus = 'all' | 'active' | 'completed';

type Params = {
  status?: TodoStatus;
};

type TodoProps = {
  searchParams?: Params;
};

export default async function Home({ searchParams }: TodoProps) {
  const status = searchParams?.status;
  const todos = await getTodos();
  const filteredTodos = todos.filter((todo) => (status === 'all' ? true : todo.status === status));

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-3 text-8xl font-thin tracking-tight text-gray-300">todos</h1>
      <div className="relative z-10 w-full max-w-[550px]">
        <div className={`todo-card ${!Boolean(todos.length) ? 'before:hidden after:hidden' :''}`}>
          <div className="flex items-center p-4 shadow-card-inner">
            {Boolean(todos.length) && <ToggleTodosStatus todos={todos} />}
            <CreateTodo />
          </div>

          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="todo group">
                <TodoStatus todo={todo} />
                <TodoMessage todo={todo} />
                <DeleteTodo todo={todo} />
              </li>
            ))}
          </ul>

          {Boolean(todos.length) && (
            <div className="flex items-center justify-between px-2 py-1 text-sm">
              <TodoControlPanel status={status} todos={todos} />
              <ArchiveTodo todos={todos} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5 w-full items-center mt-16">
          <p className="text-[10px] text-gray-300">Double-click to edit a todo</p>
          <p className="text-[10px] text-gray-300">
            Created by{' '}
            <a className="text-gray-400 hover:underline" href="https://github.com/platypusrex">
              Frank Cooke
            </a>
          </p>
          <p className="text-[10px] text-gray-300">
            In homage to {' '}
            <a className="text-gray-400 hover:underline" href="https://todomvc.com/">
              TodoMVC
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
