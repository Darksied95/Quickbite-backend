import type { Knex } from "knex";
import { USER_STATUS } from "../../modules/users/user.constant";
import { TableNames } from "../tables/table.constant";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableNames.DriverProfiles, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
        table.uuid("user_id").notNullable().references("id").inTable(TableNames.Users).unique();
        table.enum("vehicle_type", ["car", "motorbike", "bicycle"]).notNullable();
        table.integer("total_rides").notNullable().defaultTo(0);
        table.enum("status", USER_STATUS).notNullable().defaultTo("active");
        table.boolean("is_available").notNullable().defaultTo(false);
        table.timestamps(true, true);

        table.index("user_id");
        table.index("status");
        table.index("is_available");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TableNames.DriverProfiles);
}

