import { pgTable, uuid, timestamp, integer, decimal } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';

export const customerProfiles = pgTable('customer_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id').notNull().unique().references(() => users.id),
    total_orders: integer('total_orders').notNull().default(0),
    total_spent: integer('total_spent'),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
});


export type ICustomer = typeof customerProfiles.$inferSelect
export type INewCustomer = typeof customerProfiles.$inferInsert
export type IUpdateCustomer = Pick<ICustomer, 'total_orders' | 'total_spent'>