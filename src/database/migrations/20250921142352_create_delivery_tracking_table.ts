import type { Knex } from "knex";
import { DELIVERY_STATUS } from "src/modules/orders/order.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("delivery_tracking", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("order_id").notNullable().references("id").inTable("orders")
        table.string("delivery_status").notNullable();
        table.decimal("longitude").notNullable();
        table.decimal("latitude").notNullable();
        table.enum("status", DELIVERY_STATUS)
        table.timestamps(true, true);

        table.index("order_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("delivery_tracking");
}

