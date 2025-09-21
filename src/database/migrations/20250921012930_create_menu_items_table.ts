import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('menu_items', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.uuid('category_id').notNullable().references('id').inTable('menu_categories').onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid('restaurant_id').notNullable().references('id').inTable('restaurant_profiles').onDelete('CASCADE').onUpdate('CASCADE');
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
    return knex.schema.dropTableIfExists('menu_items');
}

