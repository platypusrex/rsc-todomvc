'use server';

import { and, asc, eq, ne } from 'drizzle-orm';
import { db } from '~/db';
import { todos } from '~/db/schema';
import { auth } from '~/auth';

export const getTodos = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated.');
  }

  return db.query.todos.findMany({
    orderBy: asc(todos.createdAt),
    where: and(eq(todos.userId, session.user.id), ne(todos.status, 'archived')),
  });
};
