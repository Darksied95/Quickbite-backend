import type { Knex } from 'knex';
import { TableNames } from '../tables/table.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableNames.CustomerProfiles, function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .unique()
      .notNullable()
      .references('id')
      .inTable(TableNames.Users)
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('total_orders').notNullable().defaultTo(0);
    table.decimal('total_spent');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableNames.CustomerProfiles);
}
