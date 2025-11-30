import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';

export async function seedAdminProfiles(db: NodePgDatabase<typeof schema>) {
    const adminsId = await db
        .select({ id: schema.users.id })
        .from(schema.users)
        .where(eq(schema.users.role, "admin"));

    const admins = adminsId.map(user => ({
        id: randomUUID(),
        user_id: user.id,
    }));

    await db.insert(schema.adminProfiles).values(admins);
}