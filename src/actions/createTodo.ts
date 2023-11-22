'use server';

import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { todos } from '~/db/schema';
import { auth } from '~/auth';
import { eq } from 'drizzle-orm';

export const createTodo = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated.');
  }

  const userId = session.user.id;
  const currentTodos = await db.query.todos.findMany({ where: eq(todos.userId, userId) });
  if (currentTodos.length > 500) {
    throw new Error('Max number of todos exceeded. Please delete some todos before adding more.');
  }
  const todo = formData.get('todo') as string;
  await db.insert(todos).values({ message: todo, status: 'active', userId });
  formData.delete('todo');
  revalidatePath('/');
};
