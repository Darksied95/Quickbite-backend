import { Injectable } from '@nestjs/common';
import { DrizzleTransaction } from 'src/database/drizzle.module';
import { customerProfiles, INewCustomer } from './customers.schema';

@Injectable()
export class CustomerRepository {
  async create(data: INewCustomer, trx: DrizzleTransaction) {
    const [customer] = await trx
      .insert(customerProfiles)
      .values(data)
      .returning();
    return customer;
  }
}
