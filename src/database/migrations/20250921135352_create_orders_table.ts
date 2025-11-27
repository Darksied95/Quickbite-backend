import type { Knex } from "knex";
import { ORDER_STATUS, ORDER_STATUS_VALUES } from "../../modules/orders/order.constant";
import { TableNames } from "../tables/table.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.Orders, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("restaurant_id").notNullable().references("id").inTable(TableNames.RestaurantProfiles).onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("driver_id").notNullable().references("id").inTable(TableNames.DriverProfiles).onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("customer_id").notNullable().references("id").inTable(TableNames.Users).onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("customer_address_id").notNullable().references("id").inTable(TableNames.Addresses).onDelete('CASCADE').onUpdate('CASCADE');
        table.enum("status", ORDER_STATUS_VALUES).notNullable().defaultTo("pending");
        table.string("order_number").notNullable(); //human readable order number
        table.decimal("total_cost").notNullable();
        table.decimal("delivery_fee").notNullable();
        table.timestamps(true, true);

        table.index("restaurant_id");
        table.index("driver_id");
        table.index("customer_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.Orders);
}

