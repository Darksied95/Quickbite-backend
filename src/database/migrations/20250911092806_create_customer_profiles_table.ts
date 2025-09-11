import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("customer_profiles", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'))
        table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
        table.integer("total_orders").notNullable().defaultTo(0)
        table.decimal("total_spent")
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("customer_profiles")
}