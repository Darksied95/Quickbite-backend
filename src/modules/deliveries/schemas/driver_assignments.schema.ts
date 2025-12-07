import { pgTable, uuid, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { orders } from 'src/database/drizzle.schema';
import { users } from 'src/modules/users/users.schema';
import { DRIVER_DELIVERY_STATUS_VALUE } from '../../drivers/driver.constants';

export const driverAssignmentStatusEnum = pgEnum(
  'driver_assignment_status',
  DRIVER_DELIVERY_STATUS_VALUE,
);

export const driverAssignments = pgTable('driver_assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  order_id: uuid('order_id')
    .notNull()
    .references(() => orders.id),
  driver_id: uuid('driver_id')
    .notNull()
    .references(() => users.id),
  status: driverAssignmentStatusEnum('status').notNull().default('assigned'),

  assigned_at: timestamp('assigned_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  picked_up_at: timestamp('picked_up_at', { withTimezone: true }),
  delivered_at: timestamp('delivered_at', { withTimezone: true }),
  cancelled_at: timestamp('cancelled_at', { withTimezone: true }),

  cancellation_reason: varchar('cancellation_reason', { length: 500 }),
});
