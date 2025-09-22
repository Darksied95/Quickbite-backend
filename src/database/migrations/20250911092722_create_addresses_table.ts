import type { Knex } from 'knex';
import { TableNames } from '../tables/table.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableNames.Addresses, function (table) {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').notNullable().references('id').inTable(TableNames.Users).onDelete('CASCADE').onUpdate('CASCADE');
      table.string('street_address').notNullable();
      table.string('apartment_unit').notNullable();
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
      table.index("user_id");
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableNames.Addresses);
}
