import { pgTable, uuid, varchar, integer, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { restaurantProfiles } from '../../restaurants/schemas/restaurant_profiles.schema';
import { driverProfiles } from '../../drivers/schemas/driver_profiles.schema';
import { users } from '../../users/users.schema';
import { addresses } from '../../addresses/addresses.schema';
import { ORDER_STATUS } from '../order.constant';

export const orderStatusEnum = pgEnum('order_status', ORDER_STATUS as [string, ...string[]]);

export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurantProfiles.id),
    driverId: uuid('driver_id').notNull().references(() => driverProfiles.id),
    customerId: uuid('customer_id').notNull().references(() => users.id),
    customerAddressId: uuid('customer_address_id').notNull().references(() => addresses.id),
    status: orderStatusEnum('status').notNull().default('pending'),
    orderNumber: varchar('order_number').notNull().unique(),
    totalCost: integer('total_cost').notNull(),
    deliveryFee: integer('delivery_fee').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('orders_restaurant_id_idx').on(table.restaurantId),
    index('orders_driver_id_idx').on(table.driverId),
    index('orders_customer_id_idx').on(table.customerId),
]);