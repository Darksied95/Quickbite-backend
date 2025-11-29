import { pgTable, uuid, varchar, timestamp, pgEnum, index, integer } from 'drizzle-orm/pg-core';
import { driverProfiles } from '../drivers/schemas/driver_profiles.schema';

export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'completed', 'failed']);

export const driverTransactions = pgTable('driver_transactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    driverId: uuid('driver_id').notNull().references(() => driverProfiles.id),
    orderId: varchar('order_id').notNull().unique(),
    paymentMethod: varchar('payment_method').notNull(),
    status: transactionStatusEnum('status').notNull().default('pending'),
    amount: integer('amount').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('driver_transactions_driver_id_idx').on(table.driverId),
]);