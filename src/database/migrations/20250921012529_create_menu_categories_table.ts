import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.MenuCategories, function (table) {
        table.string('name').notNullable();
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('restaurant_id').notNullable().references('id').inTable(TableNames.RestaurantProfiles).onDelete('CASCADE').onUpdate('CASCADE');
        table.boolean('is_active').notNullable().defaultTo(true);
        table.timestamps(true, true);

        table.index("restaurant_id");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableNames.MenuCategories);
}

