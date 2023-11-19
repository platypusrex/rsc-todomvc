import { pgTable, timestamp, uuid, text, pgEnum } from 'drizzle-orm/pg-core';

export const status = pgEnum('status', ['active', 'completed', 'archived']);
export const todos = pgTable('todos', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  message: text('message').notNull(),
  status: status('status').notNull(),
});
