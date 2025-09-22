import type { Knex } from "knex";
import { TableNames } from "../tables/table.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.OrderItems, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("order_id").notNullable().references("id").inTable(TableNames.Orders)
        table.uuid("menu_item_id").notNullable().references("id").inTable(TableNames.MenuItems)
        table.decimal("quantity").notNullable();
        table.decimal("price_at_time_of_order").notNullable();
        table.timestamps(true, true);

        table.index("order_id");
        table.index("menu_item_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.OrderItems);
}

