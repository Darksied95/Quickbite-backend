import { pgTable, uuid, varchar, text, decimal, boolean, timestamp, pgEnum, index, real } from 'drizzle-orm/pg-core';

export const entityTypeEnum = pgEnum('entity_type', ['user', 'restaurant']);

export const addresses = pgTable('addresses', {
    id: uuid('id').primaryKey().defaultRandom(),
    entityId: uuid('entity_id').notNull(),
    entityType: entityTypeEnum('entity_type').notNull(),
    streetAddress: varchar('street_address').notNull(),
    apartmentUnit: varchar('apartment_unit'),
    city: varchar('city').notNull(),
    state: varchar('state').notNull(),
    postalCode: varchar('postal_code').notNull(),
    country: varchar('country').notNull(),
    latitude: real('latitude').notNull(),
    longitude: real('longitude').notNull(),
    isDefault: boolean('is_default').notNull().default(false),
    label: varchar('label'),
    deliveryInstructions: text('delivery_instructions'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (table) => [
    index('addresses_lat_lng_idx').on(table.latitude, table.longitude),
    index('addresses_entity_idx').on(table.entityId, table.entityType),
]);