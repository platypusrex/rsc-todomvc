'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { Todo, todos } from '~/db/schema';

type UpdateTodoMessageArgs = {
  todo: Todo;
  error?: string;
  status?: string;
};

export const updateTodoMessage = async (
  prevState: UpdateTodoMessageArgs,
  formData: FormData
): Promise<UpdateTodoMessageArgs> => {
  const { todo } = prevState ?? {};
  if (!todo) return prevState;

  try {
    const { id } = todo;
    const currentTodo = await db.select().from(todos).where(eq(todos.id, id));
    const updatedMessage = formData.get('message') as string;

    if (currentTodo?.[0].message === updatedMessage) {
      return { ...prevState, todo: currentTodo[0] };
    }

    const updatedTodo = await db
      .update(todos)
      .set({ message: updatedMessage })
      .where(eq(todos.id, id))
      .returning();

    revalidatePath('/');
    return { todo: updatedTodo[0], status: 'success' };
  } catch (e) {
    if (e instanceof Error) {
      return { ...prevState, error: e.message };
    } else {
      return { ...prevState, error: 'unknown error' };
    }
  }
};
