import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurant.service';
import { RestaurantsController } from './controllers/restaurant.controller';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { AddressModule } from '../addresses/addresses.module';
import { MenuCategoriesService } from './services/menu-category.service';
import { MenuCategoriesRepository } from './repositories/menu-category-repository';
import { MenuCategoriesController } from './controllers/menu-category.controller';

@Module({
  imports: [AddressModule],
  providers: [RestaurantsService, RestaurantRepository, MenuCategoriesService, MenuCategoriesRepository],
  controllers: [RestaurantsController, MenuCategoriesController],
  exports: [RestaurantsService]
})
export class RestaurantsModule { }
