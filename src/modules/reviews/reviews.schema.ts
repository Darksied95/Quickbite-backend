import {
  pgTable,
  uuid,
  smallint,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';
import { restaurantProfiles } from '../restaurants/schemas/restaurant_profiles.schema';
import { orders } from '../orders/schemas/orders.schema';

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    restaurant_id: uuid('restaurant_id')
      .notNull()
      .references(() => restaurantProfiles.id),
    customer_id: uuid('customer_id')
      .notNull()
      .references(() => users.id),
    order_id: uuid('order_id')
      .notNull()
      .references(() => orders.id),
    restaurant_rating: smallint('restaurant_rating').notNull(),
    driver_rating: smallint('driver_rating').notNull(),
    comment: text('comment'),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('reviews_restaurant_id_idx').on(table.restaurant_id),
    index('reviews_customer_id_idx').on(table.customer_id),
    index('reviews_order_id_idx').on(table.order_id),
    index('reviews_restaurant_rating_idx').on(table.restaurant_rating),
    index('reviews_driver_rating_idx').on(table.driver_rating),
  ],
);
