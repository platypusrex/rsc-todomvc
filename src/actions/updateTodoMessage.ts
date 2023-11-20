'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { todos } from '~/db/schema';

export const updateTodoMessage = async (id: string, formData: FormData) => {
  if (!id) return;

  const todo = await db.select().from(todos).where(eq(todos.id, id));
  const updatedMessage = formData.get('message') as string;
  if (todo?.[0].message === updatedMessage) return;

  await db.update(todos).set({ message: updatedMessage }).where(eq(todos.id, id));
  revalidatePath('/');
};
