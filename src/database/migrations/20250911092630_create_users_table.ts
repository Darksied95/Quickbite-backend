import type { Knex } from 'knex';
import { USER_ROLES, USER_STATUS } from '../../modules/users/user.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email', 255).unique().notNullable();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('phone', 20).notNullable();
    table.enum('role', USER_ROLES).notNullable();
    table.enum('status', USER_STATUS).notNullable().defaultTo('active');
    table.timestamps(true, true);

    table.index("email")
    table.index("role")
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
