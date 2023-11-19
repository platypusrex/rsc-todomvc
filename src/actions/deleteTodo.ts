'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { todos } from '~/db/schema';

export const deleteTodo = async (id: string) => {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath('/');
};
