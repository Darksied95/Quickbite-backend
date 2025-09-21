import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('menu_categories', function (table) {
        table.string('name').notNullable();
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('restaurant_id').notNullable().references('id').inTable('restaurant_profiles').onDelete('CASCADE').onUpdate('CASCADE');
        table.boolean('is_active').notNullable().defaultTo(true);
        table.timestamps(true, true);

        table.index("restaurant_id");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('menu_categories');
}

