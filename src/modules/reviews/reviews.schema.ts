import { pgTable, uuid, smallint, text, timestamp, index } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';
import { restaurantProfiles } from '../restaurants/schemas/restaurant_profiles.schema';
import { orders } from '../orders/schemas/orders.schema';

export const reviews = pgTable('reviews', {
    id: uuid('id').primaryKey().defaultRandom(),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurantProfiles.id),
    customerId: uuid('customer_id').notNull().references(() => users.id),
    orderId: uuid('order_id').notNull().references(() => orders.id),
    restaurantRating: smallint('restaurant_rating').notNull(),
    driverRating: smallint('driver_rating').notNull(),
    comment: text('comment'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('reviews_restaurant_id_idx').on(table.restaurantId),
    index('reviews_customer_id_idx').on(table.customerId),
    index('reviews_order_id_idx').on(table.orderId),
    index('reviews_restaurant_rating_idx').on(table.restaurantRating),
    index('reviews_driver_rating_idx').on(table.driverRating),
]);