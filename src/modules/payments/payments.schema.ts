import { pgTable, uuid, varchar, timestamp, pgEnum, index, integer } from 'drizzle-orm/pg-core';
import { orders } from '../orders/schemas/orders.schema';

export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'completed', 'failed']);

export const payments = pgTable('payments', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').notNull().references(() => orders.id).unique(),
    transactionId: varchar('transaction_id').notNull().unique(),
    paymentMethod: varchar('payment_method').notNull(),
    status: paymentStatusEnum('status').notNull().default('pending'),
    amount: integer('amount').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('payments_order_id_idx').on(table.orderId),
]);