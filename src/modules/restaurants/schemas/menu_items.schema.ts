import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { menuCategories } from './menu_categories.schema';
import { restaurantProfiles } from './restaurant_profiles.schema';
import { sql } from 'drizzle-orm';

export const menuItems = pgTable(
  'menu_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    category_id: uuid('category_id')
      .notNull()
      .references(() => menuCategories.id),
    restaurant_id: uuid('restaurant_id')
      .notNull()
      .references(() => restaurantProfiles.id),
    stock: integer('stock').notNull().default(0),
    description: text('description'),
    price: integer('price').notNull(),
    is_available: boolean('is_available').notNull().default(true),
    image_url: varchar('image_url'),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('menu_items_category_id_idx').on(table.category_id),
    index('menu_items_restaurant_id_idx').on(table.restaurant_id),
    check('stock_non_negative', sql`${table.stock} >=0`),
  ],
);

export type IMenuItem = typeof menuItems.$inferSelect;
export type INewMenuItem = typeof menuItems.$inferInsert;
export type IUpdateMenuItem = Partial<
  Pick<
    IMenuItem,
    'name' | 'description' | 'price' | 'stock' | 'is_available' | 'image_url'
  >
>;
