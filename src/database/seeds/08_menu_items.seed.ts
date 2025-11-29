import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'crypto';

export async function seedMenuItems(db: NodePgDatabase<typeof schema>) {
    const { faker } = await import('@faker-js/faker');

    const categories = await db
        .select({ id: schema.menuCategories.id })
        .from(schema.menuCategories);

    if (categories.length === 0) {
        console.log('⚠️ No categories found. Skipping menu item seeding.');
        return;
    }

    const restaurants = await db
        .select({ id: schema.restaurantProfiles.id })
        .from(schema.restaurantProfiles);

    if (restaurants.length === 0) {
        console.log('⚠️ No restaurants found. Skipping menu item seeding.');
        return;
    }

    const menuItems = Array.from({ length: 30 }, () => ({
        id: randomUUID(),
        name: faker.commerce.productName(),
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
        restaurant_id: restaurants[Math.floor(Math.random() * restaurants.length)].id,
        stock: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence(),
        price: Math.floor(Math.random() * (10000 - 1000) + 1000),
        is_available: Math.random() > 0.5,
        image_url: faker.image.imageUrl(),
    }));

    await db.insert(schema.menuItems).values(menuItems);
}
