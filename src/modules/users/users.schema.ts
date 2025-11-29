import { pgTable, uuid, varchar, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { USER_ROLES_VALUES, USER_STATUS_VALUES } from './user.constant';

export const userRoleEnum = pgEnum('user_role', USER_ROLES_VALUES as [string, ...string[]]);
export const userStatusEnum = pgEnum('user_status', USER_STATUS_VALUES as [string, ...string[]]);

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({ length: 255 }).notNull().unique(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 20 }).notNull(),
    role: userRoleEnum().notNull(),
    status: userStatusEnum().notNull().default('active'),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}, (table) => [
    index('users_role_idx').on(table.role),
]);