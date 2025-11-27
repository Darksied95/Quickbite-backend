import { Knex } from "knex";
import { TableNames } from "../tables/table.constant";
import { USER_ROLES } from "../../modules/users/user.constant";
import { randomUUID } from "node:crypto";
import { Restaurant_APPROVAL_STATES } from "../../modules/restaurants/restaurant.constant";

export async function seed(knex: Knex) {
    const { faker } = await import('@faker-js/faker');


    const restaurantsOwners = await knex(TableNames.Users).select('id').where('role', USER_ROLES.restaurant_owner)

    const restaurants = Array.from({ length: 10 }, () => ({
        id: randomUUID(),
        name: faker.company.name(),
        owner_id: restaurantsOwners[Math.floor(Math.random() * restaurantsOwners.length)].id,
        phone: "+2347012345669",
        email: faker.internet.email(),
        description: faker.lorem.sentence(),
        logo_url: faker.image.business(),
        is_active: Math.random() > 0.5,
        status: Restaurant_APPROVAL_STATES.Approved,
    }))

    await knex(TableNames.RestaurantProfiles).insert(restaurants)
}