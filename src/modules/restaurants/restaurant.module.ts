import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurant.service';
import { RestaurantsController } from './controllers/restaurant.controller';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { AddressModule } from '../addresses/addresses.module';
import { MenuCategoriesService } from './services/menu-category.service';
import { MenuCategoriesRepository } from './repositories/menu-categories.repository';
import { MenuCategoriesController } from './controllers/menu-category.controller';
import { MenuItemService } from './services/menu-item.service';
import { MenuItemsRepository } from './repositories/menu-items.repository';
import { MenuItemController } from './controllers/menu-item.controller';
import { RestaurantOwnerGuard } from './restaurant-owner.guard';

@Module({
  imports: [AddressModule],
  providers: [
    RestaurantsService,
    RestaurantRepository,
    MenuCategoriesService,
    MenuCategoriesRepository,
    MenuItemService,
    MenuItemsRepository,
    RestaurantOwnerGuard
  ],
  controllers: [
    RestaurantsController,
    MenuCategoriesController,
    MenuItemController,
  ],
  exports: [
    RestaurantsService,
    RestaurantOwnerGuard,
    RestaurantRepository,
    MenuItemService
  ]
})
export class RestaurantsModule { }
