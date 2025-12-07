import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';

export async function seedMenuCategories(db: NodePgDatabase<typeof schema>) {
  const { faker } = await import('@faker-js/faker');

  const restaurants = await db
    .select({ id: schema.restaurantProfiles.id })
    .from(schema.restaurantProfiles);

  if (restaurants.length === 0) {
    console.log('⚠️ No restaurants found. Skipping category seeding.');
    return;
  }

  const categories = Array.from({ length: 10 }, () => ({
    id: randomUUID(),
    restaurant_id:
      restaurants[Math.floor(Math.random() * restaurants.length)].id,
    name: faker.commerce.productName(),
    is_active: Math.random() > 0.5,
  }));

  await db.insert(schema.menuCategories).values(categories);
}
