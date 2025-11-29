import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../drizzle.schema';
import { USER_ROLES } from '../../modules/users/user.constant';
import { randomUUID } from 'node:crypto';

export async function seedCustomerProfiles(db: NodePgDatabase<typeof schema>) {
    const users = await db
        .select({ id: schema.users.id })
        .from(schema.users)
        .where(eq(schema.users.role, USER_ROLES.customer));

    const customers = users.map(user => ({
        id: randomUUID(),
        user_id: user.id,
    }));

    await db.insert(schema.customerProfiles).values(customers);
}