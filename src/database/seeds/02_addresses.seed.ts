import { Knex } from "knex";
import { TableNames } from "../tables/table.constant";
import { randomUUID } from "node:crypto";

export async function seed(knex: Knex): Promise<void> {
    const { faker } = await import('@faker-js/faker');


    const usersAddresses = Array.from({ length: 10 }, () => ({
        id: randomUUID(),
        entity_id: knex.raw('gen_random_uuid()'),
        entity_type: 'user' as 'user',
        street_address: faker.address.streetAddress(),
        apartment_unit: faker.address.buildingNumber(),
        city: faker.address.city(),
        state: faker.address.state(),
        postal_code: faker.address.zipCode(),
        country: "Nigeria",
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
        is_default: faker.datatype.boolean(),
        label: faker.lorem.word(),
        delivery_instructions: faker.lorem.sentence(),
    }))

    await knex(TableNames.Addresses).insert(usersAddresses)
}