import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './customers.repository';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomerRepository],
  exports: [CustomersService],
})
export class CustomersModule {}
