import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { DrizzleTransaction } from 'src/database/drizzle.module';
import { INewCustomer } from './customers.schema';

@Injectable()
export class CustomersService {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async create(customerData: INewCustomer, trx: DrizzleTransaction) {
    const user = await this.customerRepository.create(customerData, trx);

    if (!user) {
      throw new InternalServerErrorException('Failed to create customer data');
    }
    return user;
  }
}
