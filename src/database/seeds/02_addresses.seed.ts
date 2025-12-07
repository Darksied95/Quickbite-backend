import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';

export async function seedAddresses(db: NodePgDatabase<typeof schema>) {
  const { faker } = await import('@faker-js/faker');

  const userAddresses = Array.from({ length: 10 }, () => ({
    id: randomUUID(),
    entity_id: randomUUID(),
    entity_type: 'user' as const,
    street_address: faker.address.streetAddress(),
    apartment_unit: faker.address.buildingNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    postal_code: faker.address.zipCode(),
    country: 'Nigeria',
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    is_default: faker.datatype.boolean(),
    label: faker.lorem.word(),
    delivery_instructions: faker.lorem.sentence(),
  }));

  await db.insert(schema.addresses).values(userAddresses);
}
