import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../../users/users.schema';

export const tokens = pgTable('tokens', {
    id: uuid('id').primaryKey().defaultRandom(),
    token: varchar('token').notNull().unique(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    isRevoked: boolean('is_revoked').default(false),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});