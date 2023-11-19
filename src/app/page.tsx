import { CreateTodo } from '~/components/CreateTodo';
import { Todo } from '~/components/Todo';
import { ToggleTodosStatus } from '~/components/ToggleTodosStatus';
import { ArchiveTodo } from '~/components/ArchiveTodo';
import { TodoControlPanel } from '~/components/TodoControlPanel';
import { getTodos } from '~/actions/getTodos';

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
        <div className="todo-card">
          <div className="flex items-center p-4 shadow-card-inner">
            <ToggleTodosStatus todos={todos} />
            <CreateTodo />
          </div>

          <ul>
            {filteredTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>

          <div className="flex items-center justify-between px-2 py-1 text-sm">
            <TodoControlPanel status={status} todos={todos} />
            <ArchiveTodo todos={todos} />
          </div>
        </div>
      </div>
    </main>
  );
}
