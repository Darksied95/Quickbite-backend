import { Knex } from "knex";
import { TableNames } from "../tables/table.constant";
import { randomUUID } from "node:crypto";

export async function seed(knex: Knex) {
    const { faker } = await import('@faker-js/faker');

    const restaurantsIds = await knex(TableNames.RestaurantProfiles).select('id')

    const categories = Array.from({ length: 10 }, () => ({
        id: randomUUID(),
        restaurant_id: restaurantsIds[Math.floor(Math.random() * restaurantsIds.length)].id,
        name: faker.commerce.productName(),
        is_active: Math.random() > 0.5,
    }))

    await knex(TableNames.MenuCategories).insert(categories)
}