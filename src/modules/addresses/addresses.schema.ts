import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';

export const entityTypeEnum = pgEnum('entity_type', ['user', 'restaurant']);

export const addresses = pgTable(
  'addresses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    entity_id: uuid('entity_id').notNull(),
    entity_type: entityTypeEnum('entity_type').notNull(),
    street_address: varchar('street_address').notNull(),
    apartment_unit: varchar('apartment_unit'),
    city: varchar('city').notNull(),
    state: varchar('state').notNull(),
    postal_code: varchar('postal_code').notNull(),
    is_default: boolean('is_default').notNull().default(false),
    label: varchar('label'),
    delivery_instructions: text('delivery_instructions'),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => [
    index('addresses_entity_idx').on(table.entity_id, table.entity_type),
  ],
);
