'use server';

import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { todos } from '~/db/schema';

export const createTodo = async (formData: FormData) => {
  const currentTodos = await db.query.todos.findMany();
  if (currentTodos.length > 500) {
    throw new Error('Max number of todos exceeded. Please delete some todos before adding more.')
  }
  const todo = formData.get('todo') as string;
  await db.insert(todos).values({ message: todo, status: 'active' });
  formData.delete('todo');
  revalidatePath('/');
};
