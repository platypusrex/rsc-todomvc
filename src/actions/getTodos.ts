'use server';

import { asc, ne } from 'drizzle-orm';
import { db } from '~/db';
import { todos } from '~/db/schema';

export const getTodos = async () => {
  return db.query.todos.findMany({
    orderBy: asc(todos.createdAt),
    where: ne(todos.status, 'archived'),
  });
};
