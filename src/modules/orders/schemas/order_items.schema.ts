import {
  pgTable,
  uuid,
  integer,
  timestamp,
  index,
  text,
} from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
import { menuItems } from '../../restaurants/schemas/menu_items.schema';

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    order_id: uuid('order_id')
      .notNull()
      .references(() => orders.id),
    menu_item_id: uuid('menu_item_id')
      .notNull()
      .references(() => menuItems.id),
    quantity: integer('quantity').notNull(),
    menu_item_name: text('menu_item_name').notNull(),
    price_at_time_of_order: integer('price_at_time_of_order').notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('order_items_order_id_idx').on(table.order_id),
    index('order_items_menu_item_id_idx').on(table.menu_item_id),
  ],
);
