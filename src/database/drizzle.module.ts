import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './drizzle.schema';

export const DRIZZLE = Symbol('DRIZZLE');
export type DRIZZLEDB = ReturnType<typeof drizzle<typeof schema>>;
@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE,
            useFactory: () => {
                const pool = new Pool({
                    connectionString: process.env.DB_NAME,
                });
                return drizzle(pool, { schema });
            },
        },
    ],
    exports: [DRIZZLE],
})
export class DrizzleModule { }