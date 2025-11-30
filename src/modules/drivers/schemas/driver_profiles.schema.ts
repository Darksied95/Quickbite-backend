import { pgTable, uuid, integer, boolean, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from '../../users/users.schema';
import { USER_STATUS_VALUES } from '../../users/user.constant';
import { VEHICLE_TYPE_VALUE } from '../driver.constants';

export const vehicleTypeEnum = pgEnum('vehicle_type', VEHICLE_TYPE_VALUE);
export const driverStatusEnum = pgEnum('driver_status', USER_STATUS_VALUES);

export const driverProfiles = pgTable('driver_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'restrict' }),
    vehicle_type: vehicleTypeEnum('vehicle_type').notNull(),
    total_rides: integer('total_rides').notNull().default(0),
    status: driverStatusEnum('status').notNull().default('active'),
    is_available: boolean('is_available').notNull().default(false),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('driver_profiles_status_idx').on(table.status),
    index('driver_profiles_is_available_idx').on(table.is_available),
]);