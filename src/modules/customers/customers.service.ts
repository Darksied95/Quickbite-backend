import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { ICreateCustomer } from './customer.types';
import { Knex } from 'knex';

@Injectable()
export class CustomersService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(customerData: ICreateCustomer, trx: Knex.Transaction) {
    const user = await this.customerRepository.create(customerData, trx);

    if (!user) {
      throw new InternalServerErrorException('Failed to create customer data');
    }
    return user;
  }
}
