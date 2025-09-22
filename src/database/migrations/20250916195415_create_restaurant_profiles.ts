import type { Knex } from "knex";
import { TableNames } from "../../common/constants/tableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.RestaurantProfiles, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.string("name").notNullable();
        table.uuid("owner_id").notNullable().references("id").inTable(TableNames.Users);
        table.uuid("address_id").notNullable().references("id").inTable(TableNames.Addresses);
        table.string("phone")
        table.string("email")
        table.text("description")
        table.string("logo_url");
        table.boolean("is_active").notNullable().defaultTo(true);
        table.timestamps(true, true);


        table.index("owner_id");
        table.index("address_id");
        table.index("is_active");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.RestaurantProfiles);
}

