import { pgTable, uuid, decimal, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { orders } from '../../orders/schemas/orders.schema';
import { DELIVERY_STATUS } from '../../orders/order.constant';

export const deliveryStatusEnum = pgEnum('delivery_status', DELIVERY_STATUS);

export const deliveryTracking = pgTable('delivery_tracking', {
    id: uuid('id').primaryKey().defaultRandom(),
    order_id: uuid('order_id').notNull().references(() => orders.id),
    status: deliveryStatusEnum('status').notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('delivery_tracking_order_id_idx').on(table.order_id),
]);