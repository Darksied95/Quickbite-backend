import type { Knex } from "knex";
import { TableNames } from "../tables/table.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.MenuItems, function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.uuid('category_id').notNullable().references('id').inTable(TableNames.MenuCategories).onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid('restaurant_id').notNullable().references('id').inTable(TableNames.RestaurantProfiles).onDelete('CASCADE').onUpdate('CASCADE');
        table.text('description');
        table.decimal('price').notNullable();
        table.boolean('is_available').notNullable().defaultTo(true);
        table.string('image_url');
        table.timestamps(true, true);

        table.index("category_id");
        table.index("restaurant_id");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableNames.MenuItems);
}

