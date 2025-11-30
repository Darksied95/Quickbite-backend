import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { DRIZZLE, DrizzleDb, DrizzleTransaction } from 'src/database/drizzle.module';
import { addresses } from './addresses.schema';

@Injectable()
export class AddressService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb) { }

  async create(
    addressesData: CreateAddressDto[],
    entity: { id: string, type: 'user' | 'restaurant' },
    trx?: DrizzleTransaction,
  ) {

    const addressesWithUserId = addressesData.map((address) => ({
      ...address,
      entity_id: entity.id,
      entity_type: entity.type,
    }));

    const dbInstance = trx ?? this.db

    return await dbInstance.insert(addresses).values(addressesWithUserId).returning();
  }
}
