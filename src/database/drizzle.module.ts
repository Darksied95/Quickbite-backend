import { Global, Module } from '@nestjs/common';
import { drizzle, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './drizzle.schema';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';

export const DRIZZLE = Symbol('DRIZZLE');
export type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;
export type DrizzleTransaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.DB_URL,
        });
        return drizzle(pool, {
          schema,
          logger: process.env.NODE_ENV === 'development' ? true : false,
        });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
