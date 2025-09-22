import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.DriverTransactions, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("driver_id").notNullable().references("id").inTable(TableNames.DriverProfiles).onDelete('CASCADE').onUpdate('CASCADE');
        table.string("order_id").notNullable().unique();
        table.string("payment_method").notNullable();
        table.enum("status", ["pending", "completed", "failed"]).notNullable().defaultTo("pending");
        table.decimal("amount").notNullable();
        table.timestamps(true, true);

        table.index("driver_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.DriverTransactions);
}

