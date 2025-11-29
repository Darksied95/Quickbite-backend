import { pgTable, uuid, integer, decimal, timestamp, index } from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
import { menuItems } from '../../restaurants/schemas/menu_items.schema';

export const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').notNull().references(() => orders.id),
    menuItemId: uuid('menu_item_id').notNull().references(() => menuItems.id),
    quantity: integer('quantity').notNull(),
    priceAtTimeOfOrder: integer('price_at_time_of_order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('order_items_order_id_idx').on(table.orderId),
    index('order_items_menu_item_id_idx').on(table.menuItemId),
]);