import {
  pgTable,
  uuid,
  integer,
  timestamp,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';
import { restaurantProfiles } from '../../restaurants/schemas/restaurant_profiles.schema';
import { users } from '../../users/users.schema';
import { addresses } from '../../addresses/addresses.schema';
import { ORDER_STATUS } from '../order.constant';

export const orderStatusEnum = pgEnum('order_status', ORDER_STATUS);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    restaurant_id: uuid('restaurant_id')
      .notNull()
      .references(() => restaurantProfiles.id),
    customer_id: uuid('customer_id')
      .notNull()
      .references(() => users.id),
    customer_address_id: uuid('customer_address_id')
      .notNull()
      .references(() => addresses.id),
    status: orderStatusEnum('status').notNull().default('pending'),
    total_cost: integer('total_cost').notNull(),
    delivery_fee: integer('delivery_fee').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('orders_restaurant_id_idx').on(table.restaurant_id),
    index('orders_customer_id_idx').on(table.customer_id),
  ],
);

type OrderInsert = typeof orders.$inferInsert;
export type ICreateOrder = Omit<
  OrderInsert,
  'id' | 'created_at' | 'updated_at' | 'status' | 'driver_id'
>;
