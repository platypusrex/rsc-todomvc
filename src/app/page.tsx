import React from 'react';
import { getTodos } from '~/actions/getTodos';
import { CreateTodo } from '~/components/CreateTodo';
import { ToggleTodosStatus } from '~/components/ToggleTodosStatus';
import { ArchiveTodo } from '~/components/ArchiveTodo';
import { TodoControlPanel } from '~/components/TodoControlPanel';
import { TodoStatus } from '~/components/TodoStatus';
import { TodoMessage } from '~/components/TodoMessage';
import { DeleteTodo } from '~/components/DeleteTodo';
import { Footer } from '~/components/Footer';

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
    <main className="flex min-h-screen flex-col items-center bg-gray-100 px-1 py-6 md:my-2 md:px-6">
      <h1 className="mb-3 text-8xl font-thin tracking-tight text-gray-300">todos</h1>
      <div className="relative z-10 w-full max-w-[550px]">
        <div className={`todo-card ${!Boolean(todos.length) ? 'before:hidden after:hidden' : ''}`}>
          <div className="flex items-center py-4 pl-2 pr-5 shadow-card-inner">
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

        <Footer />
      </div>
    </main>
  );
}
