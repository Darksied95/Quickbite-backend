import { Knex } from "knex";
import { TableNames } from "../tables/table.constant";
import { USER_ROLES } from "../../modules/users/user.constant";
import { randomUUID } from "node:crypto";
import { VEHICLE_TYPE_VALUE } from "../../modules/drivers/driver.constants";

export async function seed(knex: Knex) {
    const driversId = await knex(TableNames.Users).select('id').where('role', USER_ROLES.driver)
    const drivers = driversId.map(user => ({
        user_id: user.id,
        id: randomUUID(),
        vehicle_type: VEHICLE_TYPE_VALUE[Math.floor(Math.random() * VEHICLE_TYPE_VALUE.length)],
        total_rides: Math.floor(Math.random() * 100),
        status: "active",
        is_available: Math.random() > 0.5,
    }))

    await knex(TableNames.DriverProfiles).insert(drivers)
}