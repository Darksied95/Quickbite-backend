import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from '../../users/users.schema';
import { Restaurant_APPROVAL_STATES } from '../restaurant.constant';

export const restaurantStatusEnum = pgEnum('restaurant_status', Object.values(Restaurant_APPROVAL_STATES) as [string, ...string[]]);

export const restaurantProfiles = pgTable('restaurant_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    owner_id: uuid('owner_id').notNull().references(() => users.id),
    phone: varchar('phone'),
    email: varchar('email'),
    description: text('description'),
    logo_url: varchar('logo_url'),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    is_active: boolean('is_active').notNull().default(true),
    status: restaurantStatusEnum('status').notNull().default(Restaurant_APPROVAL_STATES.Pending),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('restaurant_profiles_owner_id_idx').on(table.owner_id),
    index('restaurant_profiles_owner_status_idx').on(table.owner_id, table.status),
    index('restaurant_profiles_is_active_idx').on(table.is_active),
]);

export type IRestaurant = typeof restaurantProfiles.$inferSelect
export type NewRestaurant = typeof restaurantProfiles.$inferInsert
export type UpdateRestaurant = Partial<IRestaurant>