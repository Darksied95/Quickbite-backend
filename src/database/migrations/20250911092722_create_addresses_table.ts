import type { Knex } from 'knex';
import { TableNames } from '../tables/table.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableNames.Addresses, function (table) {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('entity_id').notNullable()
      table.enum('entity_type', ['user', 'restaurant']).notNullable()
      table.string('street_address').notNullable();
      table.string('apartment_unit');
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('postal_code').notNullable();
      table.string('country').notNullable();
      table.decimal("latitude", 10, 8).notNullable();
      table.decimal("longitude", 11, 8).notNullable();
      table.boolean('is_default').notNullable().defaultTo(false);
      table.string("label")
      table.text("delivery_instructions")
      table.timestamps(true, true);

      table.index(["latitude", "longitude"]);
      table.index(['entity_id', 'entity_type']);
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableNames.Addresses);
}
