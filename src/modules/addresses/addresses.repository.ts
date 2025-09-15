import { Knex } from 'knex';
import { CreateAddressDto } from './dto/create-address.dto';
import { IAddress } from './addresses.types';

type Address = (CreateAddressDto & { user_id: string })[];
interface IAddresses {
  create(addresses: Address, Trx: Knex.Transaction): Promise<IAddress[] | null>;
}

export class AddressesRepository implements IAddresses {
  async create(addresses: Address, trx: Knex.Transaction) {
    const results = trx('addresses').insert(addresses).returning('*');
    return results || null;
  }
}
