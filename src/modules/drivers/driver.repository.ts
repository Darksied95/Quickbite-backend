import { Inject, Injectable } from '@nestjs/common';
import {
  driverProfiles,
  ICreateDriver,
  IUpdateDriver,
} from './schemas/driver_profiles.schema';
import { DRIZZLE, DrizzleTransaction } from 'src/database/drizzle.module';
import { and, eq, isNull } from 'drizzle-orm';

@Injectable()
export class DriverRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleTransaction) {}

  private nonDeletedDrivers() {
    return isNull(driverProfiles.deleted_at);
  }

  async create(data: ICreateDriver, trx: DrizzleTransaction) {
    const [driver] = await trx.insert(driverProfiles).values(data).returning();
    return driver;
  }

  async findById(id: string) {
    const driver = await this.db.query.driverProfiles.findFirst({
      where: and(eq(driverProfiles.id, id), this.nonDeletedDrivers()),
    });
    return driver || null;
  }

  async findAll() {
    return this.db.query.driverProfiles.findMany({
      where: this.nonDeletedDrivers(),
    });
  }

  async findByUserId(user_id: string) {
    return this.db.query.driverProfiles.findFirst({
      where: and(eq(driverProfiles.user_id, user_id), this.nonDeletedDrivers()),
    });
  }

  async update(id: string, data: IUpdateDriver) {
    return this.db
      .update(driverProfiles)
      .set(data)
      .where(and(eq(driverProfiles.id, id), this.nonDeletedDrivers()));
  }
}
