import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.Notifications, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("user_id").notNullable().references("id").inTable(TableNames.Users).onDelete('CASCADE').onUpdate('CASCADE');
        table.enum("type", ["order", "delivery", "payment"]).notNullable();
        table.string("title").notNullable();
        table.text("message").notNullable();
        table.boolean("is_read").notNullable().defaultTo(false);
        table.timestamps(true, true);

        table.index("user_id");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.Notifications);
}

