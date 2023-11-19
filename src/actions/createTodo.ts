'use server';

import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { todos as todosSchema } from '~/db/schema';

export const createTodo = async (formData: FormData) => {
  const todo = formData.get('todo') as string;
  await db.insert(todosSchema).values({ message: todo, status: 'active' });
  formData.delete('todo');
  revalidatePath('/');
};
