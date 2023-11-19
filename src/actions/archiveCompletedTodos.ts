'use server';

import { eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { todos } from '~/db/schema';

export const archiveCompletedTodos = async () => {
  const completedTodos = await db.query.todos.findMany({
    where: eq(todos.status, 'completed'),
  });
  const ids = completedTodos.map((todo) => todo.id);
  if (!ids.length) return;

  await db.update(todos).set({ status: 'archived' }).where(inArray(todos.id, ids));
  revalidatePath('/');
};
