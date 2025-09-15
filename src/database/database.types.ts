import { IUser } from 'src/modules/users/users.type';
import { Knex } from 'knex';
import { ICustomerProfile } from 'src/modules/customers/customer.types';
import { IAddress } from 'src/modules/addresses/addresses.types';
import { IToken } from 'src/modules/auth/token/token.type';

export type TypedKnex = Knex<DatabaseSchema>;

export interface DatabaseSchema {
  users: IUser;
  customer_profiles: ICustomerProfile;
  addresses: IAddress;
  tokens: IToken
}
