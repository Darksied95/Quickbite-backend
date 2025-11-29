import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';
import { USER_ROLES } from '../../modules/users/user.constant';
import { Restaurant_APPROVAL_STATES } from '../../modules/restaurants/restaurant.constant';
import { eq } from 'drizzle-orm';

export async function seedRestaurants(db: NodePgDatabase<typeof schema>) {
    const { faker } = await import('@faker-js/faker');

    const restaurantOwners = await db
        .select({ id: schema.users.id })
        .from(schema.users)
        .where(eq(schema.users.role, USER_ROLES.restaurant_owner));

    if (restaurantOwners.length === 0) {
        console.log('⚠️ No restaurant owners found. Skipping restaurant seeding.');
        return;
    }

    const restaurants = Array.from({ length: 10 }, () => ({
        id: randomUUID(),
        name: faker.company.name(),
        ownerId: restaurantOwners[Math.floor(Math.random() * restaurantOwners.length)].id,
        phone: '+2347012345669',
        email: faker.internet.email(),
        description: faker.lorem.sentence(),
        logoUrl: faker.image.food(),
        isActive: Math.random() > 0.5,
        status: Restaurant_APPROVAL_STATES.Approved,
    }));

    await db.insert(schema.restaurantProfiles).values(restaurants);
}
