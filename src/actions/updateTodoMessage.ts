'use server';

import { revalidatePath } from 'next/cache';
import { eq, InferSelectModel } from 'drizzle-orm';
import { db } from '~/db';
import { todos } from '~/db/schema';

export const updateTodoMessage = async (todo: InferSelectModel<typeof todos>, formData: FormData) => {
  if (!todo) return;
  const { id, message } = todo;

  const updatedMessage = formData.get('message') as string;
  if (!updatedMessage || updatedMessage === message) return;

  await db.update(todos).set({ message: updatedMessage }).where(eq(todos.id, id));
  revalidatePath('/');
};
