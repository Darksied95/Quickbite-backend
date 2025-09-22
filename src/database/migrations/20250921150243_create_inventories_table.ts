import type { Knex } from "knex";
import { TableNames } from "../tables/table.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.Inventories, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("restaurant_id").notNullable().references("id").inTable(TableNames.RestaurantProfiles).onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("item_id").notNullable().references("id").inTable(TableNames.MenuItems).onDelete('CASCADE').onUpdate('CASCADE');
        table.integer("quantity").notNullable();
        table.timestamps(true, true);

        table.index("restaurant_id");
        table.index("item_id");
        table.index("quantity");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.Inventories);
}

