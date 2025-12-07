import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverRepository } from './driver.repository';
import { DriverController } from './driver.controller';

@Module({
  controllers: [DriverController],
  providers: [DriverRepository, DriverService],
  exports: [DriverService],
})
export class DriverModule {}
