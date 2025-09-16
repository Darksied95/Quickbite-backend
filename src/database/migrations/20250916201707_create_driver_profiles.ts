import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("driver_profiles", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("user_id").notNullable().references("id").inTable("users").unique();
        table.enum("vehicle_type", ["car", "motorbike", "bicycle"]).notNullable();
        table.boolean("is_available").notNullable().defaultTo(false);
        table.boolean("is_verified").notNullable().defaultTo(false);
        table.integer("total_rides").notNullable().defaultTo(0);
        table.decimal("total_earnings").notNullable().defaultTo(0);
        table.decimal("average_rating").notNullable().defaultTo(0);
        table.boolean("is_active").notNullable().defaultTo(true);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("driver_profiles");
}

