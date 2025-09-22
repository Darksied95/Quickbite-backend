import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.Payments, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("order_id").notNullable().references("id").inTable(TableNames.Orders)
        table.string("transaction_id").notNullable().unique();
        table.string("payment_method").notNullable();
        table.enum("status", ["pending", "completed", "failed"]).notNullable().defaultTo("pending");
        table.decimal("amount").notNullable();
        table.timestamps(true, true);

        table.index("order_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.Payments);
}

