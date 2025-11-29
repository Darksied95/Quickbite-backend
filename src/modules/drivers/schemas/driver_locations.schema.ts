import { pgTable, uuid, decimal, timestamp, index } from 'drizzle-orm/pg-core';
import { driverProfiles } from '../schemas/driver_profiles.schema';

export const driverLocations = pgTable('driver_locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    driverId: uuid('driver_id').notNull().references(() => driverProfiles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('driver_locations_driver_id_idx').on(table.driverId),
]);