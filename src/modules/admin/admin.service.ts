import { Injectable } from '@nestjs/common';
import { DrizzleTransaction } from 'src/database/drizzle.module';
import { adminProfiles } from './admin.schema';

@Injectable()
export class AdminService {

    create(user_id: string, trx: DrizzleTransaction) {
        return trx.insert(adminProfiles).values({ user_id }).returning()
    }
}
