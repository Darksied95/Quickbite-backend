import { Knex } from "knex";
import { TableNames } from "../tables/table.constant";
import { USER_ROLES } from "../../modules/users/user.constant";
import { randomUUID } from "node:crypto";

export async function seed(knex: Knex): Promise<void> {
    const users = await knex(TableNames.Users).select("id").where("role", USER_ROLES.customer)

    const customers = users.map(user => ({
        user_id: user.id,
        id: randomUUID(),
    }))

    await knex(TableNames.CustomerProfiles).insert(customers)
}