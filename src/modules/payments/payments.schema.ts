import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  index,
  integer,
} from 'drizzle-orm/pg-core';
import { orders } from '../orders/schemas/orders.schema';

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'completed',
  'failed',
]);

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    order_id: uuid('order_id')
      .notNull()
      .references(() => orders.id)
      .unique(),
    transaction_id: varchar('transaction_id').notNull().unique(),
    payment_method: varchar('payment_method').notNull(),
    status: paymentStatusEnum('status').notNull().default('pending'),
    amount: integer('amount').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('payments_order_id_idx').on(table.order_id)],
);
