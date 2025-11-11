import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurant.service';
import { RestaurantsController } from './controllers/restaurant.controller';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { AddressModule } from '../addresses/addresses.module';
import { MenuCategoriesService } from './services/menu-category.service';
import { MenuCategoriesRepository } from './repositories/menu-category-repository';
import { MenuCategoriesController } from './controllers/menu-category.controller';
import { MenuItemService } from './services/menu-item.service';
import { MenuItemRepository } from './repositories/menu-item.repository';
import { MenuItemController } from './controllers/menu-item.controller';

@Module({
  imports: [AddressModule],
  providers: [
    RestaurantsService,
    RestaurantRepository,
    MenuCategoriesService,
    MenuCategoriesRepository,
    MenuItemService,
    MenuItemRepository
  ],
  controllers: [
    RestaurantsController,
    MenuCategoriesController,
    MenuItemController
  ],
  exports: [RestaurantsService]
})
export class RestaurantsModule { }
