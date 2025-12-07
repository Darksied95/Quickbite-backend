import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';

export const adminProfiles = pgTable('admin_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
