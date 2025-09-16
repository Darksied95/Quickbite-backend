import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("admin_profiles", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid("user_id").unique().notNullable().references("id").inTable("users").onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("admin_profiles")
}

