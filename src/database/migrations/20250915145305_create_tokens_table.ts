import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tokens', function (table) {
        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string("token").unique().notNullable()
        table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.boolean("is_revoked").defaultTo(false)
        table.timestamp("expires_at").notNullable()
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tokens')
}

