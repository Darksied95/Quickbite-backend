import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import {
  ICreateCustomer,
  IUpdateCustomer,
} from './customer.types';

import { CustomerProfilesTable } from 'src/database/tables/table.type';

interface ICustomerRepository {
  create(
    customerData: ICreateCustomer,
    trx: Knex.Transaction,
  ): Promise<CustomerProfilesTable | null>;
  update(
    id: string,
    customerData: IUpdateCustomer,
  ): Promise<CustomerProfilesTable | null>;
  findByUserId(user_id: string): Promise<CustomerProfilesTable | null>;
  findById(id: string): Promise<CustomerProfilesTable | null>;
}
@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async create(
    customerData: ICreateCustomer,
    trx: Knex.Transaction,
  ): Promise<CustomerProfilesTable | null> {
    const [customer] = await trx('customer_profiles')
      .insert(customerData)
      .returning('*');
    return customer || null;
  }

  async update(
    id: string,
    customerData: IUpdateCustomer,
  ): Promise<CustomerProfilesTable | null> {
    const customer = await this.knex('customer_profiles')
      .where({ id })
      .update(customerData)
      .returning('*')
      .first();
    return customer || null;
  }

  async findByUserId(user_id: string): Promise<CustomerProfilesTable | null> {
    const customer = await this.knex('customer_profiles')
      .where({ user_id })
      .returning('*')
      .first();
    return customer || null;
  }

  async findById(id: string): Promise<CustomerProfilesTable | null> {
    const customer = await this.knex('customer_profiles')
      .where({ id })
      .returning('*')
      .first();
    return customer || null;
  }
}
