import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressesRepository } from './addresses.repository';
import { Knex } from 'knex';

@Injectable()
export class AddressService {
  constructor(private readonly addressesRepository: AddressesRepository) { }

  async create(
    addresses: CreateAddressDto[],
    entity: { id: string, type: 'user' | 'restaurant' },
    trx: Knex.Transaction,
  ) {
    const addresseswithUserId = addresses.map((address) => ({
      ...address,
      entity_id: entity.id,
      entity_type: entity.type,
    }));

    return await this.addressesRepository.create(addresseswithUserId, trx);
  }
}
