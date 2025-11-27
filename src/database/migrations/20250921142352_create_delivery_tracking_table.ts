import type { Knex } from "knex";
import { DELIVERY_STATUS_VALUES } from "../../modules/orders/order.constant";
import { TableNames } from "../tables/table.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.DeliveryTracking, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("order_id").notNullable().references("id").inTable(TableNames.Orders)
        table.string("delivery_status").notNullable();
        table.decimal("longitude").notNullable();
        table.decimal("latitude").notNullable();
        table.enum("status", DELIVERY_STATUS_VALUES)
        table.timestamps(true, true);

        table.index("order_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.DeliveryTracking);
}

