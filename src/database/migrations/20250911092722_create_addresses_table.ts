import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("addresses", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        table.string("label").notNullable()
        table.string("street_address").notNullable()
        table.string("apartment_unit")
        table.string("city").notNullable()
        table.string("state").notNullable()
        table.string("postal_code").notNullable()
        table.string("country").notNullable()
        table.boolean("is_default").notNullable().defaultTo(false)
        table.timestamps(true, true)
    }).then(() => {
        return knex.raw(`
            CREATE UNIQUE INDEX addressess_user_default_unique
            ON addresses(user_id)
            WHERE is_default= true
            `)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("addresses")
}
