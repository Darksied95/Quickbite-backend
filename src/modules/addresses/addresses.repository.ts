import { Knex } from 'knex';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressTable } from 'src/database/tables/table.type';
import { TableNames } from 'src/database/tables/table.constant';

type Address = (CreateAddressDto & { entity_id: string, entity_type: 'user' | 'restaurant' })[]

interface IAddresses {
  create(addresses: Address, Trx: Knex.Transaction): Promise<AddressTable[] | null>;
}

export class AddressesRepository implements IAddresses {
  async create(addresses: Address, trx: Knex.Transaction) {
    const results = trx(TableNames.Addresses).insert(addresses).returning('*');
    return results || null;
  }
}
