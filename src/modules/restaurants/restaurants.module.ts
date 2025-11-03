import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantRepository } from './restaurants.repository';
import { AddressModule } from '../addresses/addresses.module';

@Module({
  imports: [AddressModule],
  providers: [RestaurantsService, RestaurantRepository],
  controllers: [RestaurantsController],
})
export class RestaurantsModule { }
