import { Knex } from "knex";
import { TableNames } from "../tables/table.constant";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.InventoryTransactions, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("item_id").notNullable().references("id").inTable(TableNames.MenuItems).onDelete('CASCADE').onUpdate('CASCADE');
        table.integer("quantity_change").notNullable();
        table.enum("transaction_type", ['sale', 'restock', 'adjustment', 'waste', 'damaged']).notNullable();
        table.uuid("order_id").nullable(); // order_id, purchase_order_id, etc.
        table.enum("reference_type", ["order", "manual"]).nullable();
        table.text("notes").nullable();
        table.uuid("created_by").nullable().references("id").inTable(TableNames.Users).onDelete('SET NULL').onUpdate('CASCADE');
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

        table.index("item_id");
        table.index("transaction_type");
        table.index("created_at");
        table.index(["item_id", "created_at"]); // composite index for querying item history
        table.index("reference_id"); // for looking up all transactions related to an order
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.InventoryTransactions);
}