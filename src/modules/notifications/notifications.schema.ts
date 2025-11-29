import { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';

export const notificationTypeEnum = pgEnum('notification_type', ['order', 'delivery', 'payment']);

export const notifications = pgTable('notifications', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    type: notificationTypeEnum('type').notNull(),
    title: varchar('title').notNull(),
    message: text('message').notNull(),
    isRead: boolean('is_read').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('notifications_user_id_idx').on(table.userId),
]);