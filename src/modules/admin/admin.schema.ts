import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';

export const adminProfiles = pgTable('admin_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().unique().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});