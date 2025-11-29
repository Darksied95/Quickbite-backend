import { pgTable, uuid, varchar, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { restaurantProfiles } from './restaurant_profiles.schema';

export const menuCategories = pgTable('menu_categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    restaurant_id: uuid('restaurant_id').notNull().references(() => restaurantProfiles.id),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('menu_categories_restaurant_id_idx').on(table.restaurant_id),
]);