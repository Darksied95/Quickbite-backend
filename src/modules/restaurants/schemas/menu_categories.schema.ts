import { pgTable, uuid, varchar, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { restaurantProfiles } from './restaurant_profiles.schema';

export const menuCategories = pgTable('menu_categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurantProfiles.id),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('menu_categories_restaurant_id_idx').on(table.restaurantId),
]);