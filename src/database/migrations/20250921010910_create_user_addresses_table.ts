import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.UserAddresses, function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid('address_id').notNullable().references('id').inTable('addresses').onDelete('CASCADE').onUpdate('CASCADE');
        table.boolean('is_default').notNullable().defaultTo(false);
        table.string("label")
        table.text("delivery_instructions")
        table.timestamps(true, true);


        table.index("user_id");
        table.index("address_id");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableNames.UserAddresses);
}

