import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { USER_ROLES } from '../users/user.constant';

@Controller('restaurants')
@UseGuards(AuthGuard)
export class RestaurantsController {

  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(USER_ROLES.admin, USER_ROLES.restaurant_owner)

  create(@Request() req: ExpressRequest) {
    const user = req.user;
    console.log(user);

    const data: CreateRestaurantDto = req.body;
    return this.restaurantsService.create(data);
  }
}
