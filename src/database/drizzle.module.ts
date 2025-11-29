import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './drizzle.schema';

export const DRIZZLE = Symbol('DRIZZLE');

@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE,
            useFactory: () => {
                const pool = new Pool({
                    connectionString: process.env.DB_NAME,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT || "5432"),
                });
                return drizzle(pool, { schema });
            },
        },
    ],
    exports: [DRIZZLE],
})
export class DrizzleModule { }