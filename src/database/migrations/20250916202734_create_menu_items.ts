import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("menu_items", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.string("name").notNullable();
        table.string("description", 255).notNullable();
        table.decimal("price").notNullable();
        table.string("image_url");
        table.uuid("restaurant_id").notNullable().references("id").inTable("restaurants");
        table.jsonb("ingredients");
        table.boolean("is_available").notNullable().defaultTo(true);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("menu_items");
}

