import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../drizzle.schema';
import { seedUsers } from './01_users.seed';
import { seedAddresses } from './02_addresses.seed';
import { seedCustomerProfiles } from './03_customers.seed';
import { seedAdminProfiles } from './04_admins.seed';
import { seedRestaurants } from './05_restaurant_profiles.seed';
import { seedDrivers } from './06_driver_profiles';
import { seedMenuCategories } from './07_menu_categories.seed';
import { seedMenuItems } from './08_menu_items.seed';
import { sql } from 'drizzle-orm';
import 'dotenv/config';

async function seed() {
    const pool = new Pool({
        connectionString: process.env.DB_URL,
    });

    const db = drizzle(pool, { schema });

    await db.execute(sql`
    TRUNCATE TABLE
     menu_items,
     menu_categories,
     driver_profiles,
     restaurant_profiles,
     admin_profiles,
     customer_profiles,
     addresses,
     users
        RESTART IDENTITY CASCADE
`);

    console.log('✅ Database cleared');

    // Run seeders
    await seedUsers(db);
    await seedAddresses(db);
    await seedCustomerProfiles(db);
    await seedAdminProfiles(db);
    await seedRestaurants(db);
    await seedDrivers(db);
    await seedMenuCategories(db);
    await seedMenuItems(db);

    await pool.end();
    console.log('✅ Seeding complete');
}

seed().catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
});