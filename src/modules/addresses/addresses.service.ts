import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import {
  DRIZZLE,
  DrizzleDb,
  DrizzleTransaction,
} from 'src/database/drizzle.module';
import { addresses } from './addresses.schema';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AddressService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly logger: PinoLogger,
  ) {}

  async create(
    addressesData: CreateAddressDto[],
    entity: { id: string; type: 'user' | 'restaurant' },
    trx?: DrizzleTransaction,
  ) {
    const addressesWithUserId = addressesData.map((address) => ({
      ...address,
      entity_id: entity.id,
      entity_type: entity.type,
    }));

    const dbInstance = trx ?? this.db;

    return await dbInstance
      .insert(addresses)
      .values(addressesWithUserId)
      .returning();
  }

  findByEntityId(id: string) {
    return this.db.query.addresses.findFirst({
      where: eq(addresses.entity_id, id),
    });
  }

  findById(id: string) {
    return this.db.query.addresses.findFirst({
      where: eq(addresses.id, id),
    });
  }

  async validateAddressOwnership(addressId: string, userId: string) {
    const address = await this.findById(addressId);

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (address.entity_id !== userId) {
      this.logger.warn('Address authorization failure', {
        userId,
        requestedAddressId: addressId,
      });

      throw new ForbiddenException("Cannot use another user's address");
    }
  }
}
