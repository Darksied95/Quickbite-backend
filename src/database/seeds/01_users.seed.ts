import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as bcrypt from 'bcrypt';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';
import { USER_ROLES_VALUES, USER_STATUS } from '../../modules/users/user.constant';

export async function seedUsers(db: NodePgDatabase<typeof schema>) {
    const { faker } = await import('@faker-js/faker');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = Array.from({ length: 30 }, () => ({
        id: randomUUID(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        password: hashedPassword,
        phone: '+2347012345669',
        role: USER_ROLES_VALUES[Math.floor(Math.random() * USER_ROLES_VALUES.length)] as any,
        status: "active" as USER_STATUS,
    }));

    await db.insert(schema.users).values(users);
}