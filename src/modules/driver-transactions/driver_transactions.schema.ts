import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  index,
  integer,
} from 'drizzle-orm/pg-core';
import { driverProfiles } from '../drivers/schemas/driver_profiles.schema';

export const transactionStatusEnum = pgEnum('transaction_status', [
  'pending',
  'completed',
  'failed',
]);

export const driverTransactions = pgTable(
  'driver_transactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    driver_id: uuid('driver_id')
      .notNull()
      .references(() => driverProfiles.id),
    order_id: varchar('order_id').notNull().unique(),
    payment_method: varchar('payment_method').notNull(),
    status: transactionStatusEnum('status').notNull().default('pending'),
    amount: integer('amount').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('driver_transactions_driver_id_idx').on(table.driver_id)],
);
