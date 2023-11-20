'use server';

import { db } from '~/db';
import { todos } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const updateTodoStatus = async (id: string, formData: FormData) => {
  const checkboxState = formData.get('status');
  const status = checkboxState === 'on' ? 'completed' : 'active';
  await db.update(todos).set({ status }).where(eq(todos.id, id));
  revalidatePath('/');
};
