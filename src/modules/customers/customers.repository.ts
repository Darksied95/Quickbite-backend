import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import {
  ICreateCustomer,
  ICustomerProfile,
  IUpdateCustomer,
} from './customer.types';

interface ICustomerRepository {
  create(
    customerData: ICreateCustomer,
    trx: Knex.Transaction,
  ): Promise<ICustomerProfile | null>;
  update(
    id: string,
    customerData: IUpdateCustomer,
  ): Promise<ICustomerProfile | null>;
  findByUserId(user_id: string): Promise<ICustomerProfile | null>;
  findById(id: string): Promise<ICustomerProfile | null>;
}
@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(
    customerData: ICreateCustomer,
    trx: Knex.Transaction,
  ): Promise<ICustomerProfile | null> {
    const [customer] = await trx('customer_profiles')
      .insert(customerData)
      .returning('*');
    return customer || null;
  }

  async update(
    id: string,
    customerData: IUpdateCustomer,
  ): Promise<ICustomerProfile | null> {
    const customer = await this.knex('customer_profiles')
      .where({ id })
      .update(customerData)
      .returning('*')
      .first();
    return customer || null;
  }

  async findByUserId(user_id: string): Promise<ICustomerProfile | null> {
    const customer = await this.knex('customer_profiles')
      .where({ user_id })
      .returning('*')
      .first();
    return customer || null;
  }

  async findById(id: string): Promise<ICustomerProfile | null> {
    const customer = await this.knex('customer_profiles')
      .where({ id })
      .returning('*')
      .first();
    return customer || null;
  }
}
