import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';

export async function seedAddresses(db: NodePgDatabase<typeof schema>) {
    const { faker } = await import('@faker-js/faker');

    const userAddresses = Array.from({ length: 10 }, () => ({
        id: randomUUID(),
        entityId: randomUUID(),
        entityType: 'user' as const,
        streetAddress: faker.address.streetAddress(),
        apartmentUnit: faker.address.buildingNumber(),
        city: faker.address.city(),
        state: faker.address.state(),
        postalCode: faker.address.zipCode(),
        country: 'Nigeria',
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
        isDefault: faker.datatype.boolean(),
        label: faker.lorem.word(),
        deliveryInstructions: faker.lorem.sentence(),
    }));

    await db.insert(schema.addresses).values(userAddresses);
}