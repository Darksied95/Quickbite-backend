import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("reviews", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("restaurant_id").notNullable().references("id").inTable("restaurant_profiles").onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("customer_id").notNullable().references("id").inTable("users").onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid("order_id").notNullable().references("id").inTable("orders").onDelete('CASCADE').onUpdate('CASCADE');
        table.tinyint("restaurant_rating").notNullable();
        table.tinyint("driver_rating").notNullable();
        table.text("comment");
        table.timestamps(true, true);

        table.index("restaurant_id");
        table.index("customer_id");
        table.index("order_id");
        table.index("restaurant_rating");
        table.index("driver_rating");
    });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("reviews");
}

