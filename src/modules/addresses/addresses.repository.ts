import { Knex } from 'knex';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressTable } from 'src/database/tables/table.type';

type Address = (CreateAddressDto & { user_id: string })[];
interface IAddresses {
  create(addresses: Address, Trx: Knex.Transaction): Promise<AddressTable[] | null>;
}

export class AddressesRepository implements IAddresses {
  async create(addresses: Address, trx: Knex.Transaction) {
    const results = trx('addresses').insert(addresses).returning('*');
    return results || null;
  }
}
