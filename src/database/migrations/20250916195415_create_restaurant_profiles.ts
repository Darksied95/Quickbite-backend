import type { Knex } from "knex";
import { TableNames } from "../tables/table.constant";
import { Restaurant_APPROVAL_STATES } from "../../modules/restaurants/restaurant.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.RestaurantProfiles, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.string("name").notNullable();
        table.uuid("owner_id").notNullable().references("id").inTable(TableNames.Users);
        table.string("phone")
        table.string("email")
        table.text("description")
        table.string("logo_url");
        table.timestamp("deleted_at").defaultTo(null);
        table.boolean("is_active").notNullable().defaultTo(true);
        table.enum("status", Object.values(Restaurant_APPROVAL_STATES)).notNullable().defaultTo(Restaurant_APPROVAL_STATES.Pending);
        table.timestamps(true, true);


        table.index("owner_id");
        table.index(["owner_id", "status"])
        table.index("is_active");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.RestaurantProfiles);
}

