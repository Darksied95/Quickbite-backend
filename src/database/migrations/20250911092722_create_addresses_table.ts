import type { Knex } from 'knex';
import { TableNames } from '../../common/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableNames.Addresses, function (table) {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('street_address').notNullable();
      table.string('apartment_unit');
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('postal_code').notNullable();
      table.string('country').notNullable();
      table.decimal("latitude", 10, 8).notNullable();
      table.decimal("longitude", 11, 8).notNullable();
      table.timestamps(true, true);

      table.index(["latitude", "longitude"]);
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableNames.Addresses);
}
