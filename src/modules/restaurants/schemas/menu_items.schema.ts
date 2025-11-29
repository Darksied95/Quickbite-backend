import { pgTable, uuid, varchar, text, integer, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { menuCategories } from './menu_categories.schema';
import { restaurantProfiles } from './restaurant_profiles.schema';

export const menuItems = pgTable('menu_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    categoryId: uuid('category_id').notNull().references(() => menuCategories.id),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurantProfiles.id),
    stock: integer('stock').notNull().default(0),
    description: text('description'),
    price: integer('price').notNull(),
    isAvailable: boolean('is_available').notNull().default(true),
    imageUrl: varchar('image_url'),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('menu_items_category_id_idx').on(table.categoryId),
    index('menu_items_restaurant_id_idx').on(table.restaurantId),
]);