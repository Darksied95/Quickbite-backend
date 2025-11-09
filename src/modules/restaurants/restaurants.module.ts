import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantsController } from './controllers/restaurants.controller';
import { RestaurantRepository } from './repositories/restaurants.repository';
import { AddressModule } from '../addresses/addresses.module';
import { MenuCategoriesService } from './services/menu-categories.service';
import { MenuCategoriesRepository } from './repositories/menu-category-repository';
import { MenuCategoriesController } from './controllers/menu-categories.controller';

@Module({
  imports: [AddressModule],
  providers: [RestaurantsService, RestaurantRepository, MenuCategoriesService, MenuCategoriesRepository],
  controllers: [RestaurantsController, MenuCategoriesController],
  exports: [RestaurantsService]
})
export class RestaurantsModule { }
