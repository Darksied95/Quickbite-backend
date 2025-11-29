import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle.schema';
import { randomUUID } from 'node:crypto';
import { USER_ROLES } from '../../modules/users/user.constant';
import { VEHICLE_TYPE_VALUE } from '../../modules/drivers/driver.constants';
import { eq } from 'drizzle-orm';

export async function seedDrivers(db: NodePgDatabase<typeof schema>) {

    const driverUsers = await db
        .select({ id: schema.users.id })
        .from(schema.users)
        .where(eq(schema.users.role, USER_ROLES.driver));

    if (driverUsers.length === 0) {
        console.log('⚠️ No users with driver role found. Skipping driver seeding.');
        return;
    }

    const drivers = driverUsers.map((user) => ({
        id: randomUUID(),
        user_id: user.id,
        vehicle_type: VEHICLE_TYPE_VALUE[Math.floor(Math.random() * VEHICLE_TYPE_VALUE.length)],
        total_rides: Math.floor(Math.random() * 100),
        status: 'active',
        is_available: Math.random() > 0.5,
    }));

    await db.insert(schema.driverProfiles).values(drivers);
}
