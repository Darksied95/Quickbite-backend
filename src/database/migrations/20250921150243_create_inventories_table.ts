import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("inventories", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("restaurant_id").notNullable().references("id").inTable("restaurant_profiles").onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("item_id").notNullable().references("id").inTable("menu_items").onDelete('CASCADE').onUpdate('CASCADE');
        table.integer("quantity").notNullable();
        table.timestamps(true, true);

        table.index("restaurant_id");
        table.index("item_id");
        table.index("quantity");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("inventories");
}

