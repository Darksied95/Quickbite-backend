import { Knex } from "knex"
import { TableNames } from "../tables/table.constant"
import { randomUUID } from "crypto"

export async function seed(knex: Knex) {
    const { faker } = await import('@faker-js/faker');

    const categories = await knex(TableNames.MenuCategories).select('id')
    const restaurant_ids = await knex(TableNames.RestaurantProfiles).select('id')

    const menuItems = Array.from({ length: 30 }, () => ({
        id: randomUUID(),
        name: faker.commerce.productName(),
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
        restaurant_id: restaurant_ids[Math.floor(Math.random() * restaurant_ids.length)].id,
        stock: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        price: faker.datatype.float({ min: 5, max: 50, precision: 0.01 }),
        is_available: Math.random() > 0.5,
        image_url: faker.image.food(),
    }))

    await knex(TableNames.MenuItems).insert(menuItems)
}