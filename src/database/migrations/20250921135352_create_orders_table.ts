import type { Knex } from "knex";
import { ORDER_STATUS } from "src/modules/orders/order.constant";
import { USER_STATUS } from "src/modules/users/user.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("restaurant_id").notNullable().references("id").inTable("restaurant_profiles").onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("driver_id").notNullable().references("id").inTable("driver_profiles").onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("customer_id").notNullable().references("id").inTable("users").onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("customer_address_id").notNullable().references("id").inTable("addresses").onDelete('CASCADE').onUpdate('CASCADE');
        table.enum("status", ORDER_STATUS).notNullable().defaultTo("pending");
        table.string("order_number").notNullable(); //human readable order number
        table.decimal("total_cost").notNullable();
        table.decimal("delivery_fee").notNullable();
        table.timestamps(true, true);

        table.index("restaurant_id");
        table.index("driver_id");
        table.index("user_id");
    });
}


export async function down(knex: Knex): Promise<void> {
}

