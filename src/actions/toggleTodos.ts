'use server';

import { inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { todos } from '~/db/schema';

type ToggleTodosParams = {
  ids: string[];
  status: 'active' | 'completed';
};

export const toggleTodos = async ({ status, ids }: ToggleTodosParams) => {
  await db.update(todos).set({ status }).where(inArray(todos.id, ids));
  revalidatePath('/');
};
