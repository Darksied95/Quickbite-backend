import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.AdminProfiles, function (table) {
        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid("user_id").unique().notNullable().references("id").inTable(TableNames.Users).onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.AdminProfiles)
}

