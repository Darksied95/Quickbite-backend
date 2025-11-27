import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import { TableNames } from '../tables/table.constant';
import { randomUUID } from 'node:crypto';
import { USER_ROLES_VALUES, USER_STATUS } from '../../modules/users/user.constant';


export async function seed(knex: Knex): Promise<void> {
    const { faker } = await import('@faker-js/faker');

    await knex(TableNames.RestaurantProfiles).del();
    await knex(TableNames.DriverProfiles).del();
    await knex(TableNames.Addresses).del();
    await knex(TableNames.CustomerProfiles).del();
    await knex(TableNames.Tokens).del();
    await knex(TableNames.AdminProfiles).del();
    await knex(TableNames.Users).del();

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = Array.from({ length: 30 }, () => ({
        id: randomUUID(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        password: hashedPassword,
        phone: "+2347012345669",
        role: USER_ROLES_VALUES[Math.floor(Math.random() * USER_ROLES_VALUES.length)],
        status: USER_STATUS.active,
    }))

    await knex(TableNames.Users).insert(users)

}