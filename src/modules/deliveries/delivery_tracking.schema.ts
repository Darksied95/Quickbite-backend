import { pgTable, uuid, decimal, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { orders } from '../orders/schemas/orders.schema';
import { DELIVERY_STATUS } from '../orders/order.constant';

export const deliveryStatusEnum = pgEnum('delivery_status', DELIVERY_STATUS as [string, ...string[]]);

export const deliveryTracking = pgTable('delivery_tracking', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').notNull().references(() => orders.id),
    status: deliveryStatusEnum('status').notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('delivery_tracking_order_id_idx').on(table.orderId),
]);