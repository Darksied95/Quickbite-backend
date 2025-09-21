import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("order_items", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("order_id").notNullable().references("id").inTable("orders")
        table.uuid("menu_item_id").notNullable().references("id").inTable("menu_items")
        table.decimal("quantity").notNullable();
        table.decimal("price_at_time_of_order").notNullable();
        table.timestamps(true, true);

        table.index("order_id");
        table.index("menu_item_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("order_items");
}

