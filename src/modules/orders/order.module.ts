import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { RestaurantsModule } from '../restaurants/restaurant.module';
import { AddressModule } from '../addresses/addresses.module';
import { OrderValidator } from './services/order-validator.service';
import { OrderFactory } from './services/order-factory.service';

@Module({
  imports: [RestaurantsModule, AddressModule],
  providers: [OrderService, OrderValidator, OrderFactory],
  controllers: [OrderController],
})
export class OrderModule {}
