import { pgTable, uuid, timestamp, integer, decimal } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';

export const customerProfiles = pgTable('customer_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().unique().references(() => users.id),
    totalOrders: integer('total_orders').notNull().default(0),
    totalSpent: integer('total_spent'),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
});