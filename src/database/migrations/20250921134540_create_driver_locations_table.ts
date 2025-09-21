import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("driver_locations", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("driver_id").notNullable().references("id").inTable("driver_profiles").onDelete('CASCADE').onUpdate('CASCADE');
        table.decimal("latitude", 10, 8).notNullable();
        table.decimal("longitude", 11, 8).notNullable();
        table.timestamps(true, true);

        table.index("driver_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("driver_locations");
}

