import { Injectable } from '@nestjs/common';
import { DriverRepository } from './driver.repository';
import { ICreateDriver } from './driver.interface';
import { DrizzleTransaction } from 'src/database/drizzle.module';
import { IUpdateDriver } from './schemas/driver_profiles.schema';

@Injectable()
export class DriverService {
  constructor(private readonly DriverRepo: DriverRepository) { }

  create(data: ICreateDriver, trx: DrizzleTransaction) {
    return this.DriverRepo.create(data, trx);
  }

  findById(id: string) {
    return this.DriverRepo.findById(id);
  }

  findAll() {
    return this.DriverRepo.findAll();
  }

  findByUserId(user_id: string) {
    return this.DriverRepo.findByUserId(user_id);
  }

  update(driverId: string, data: IUpdateDriver) {
    return this.DriverRepo.update(driverId, data);
  }
}
