import { Controller, Post, UseGuards, Delete, Get, Body, Param, ParseUUIDPipe, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { RestaurantsService } from '../services/restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dtos/create-restaurant.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JWTPayload } from 'src/modules/auth/token/token.type';
import { RestaurantOwnerGuard } from '../restaurant-owner.guard';

@Controller('restaurants')
@UseGuards(AuthGuard)
export class RestaurantsController {

  constructor(
    private readonly restaurantsService: RestaurantsService,
  ) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "restaurant_owner")
  create(
    @Body() data: CreateRestaurantDto,
    @CurrentUser() user: JWTPayload,
  ) {
    return this.restaurantsService.create({ ...data, owner_id: user.userId });
  }

  @Get()
  getAll() {
    return this.restaurantsService.getAll()
  }

  @Get(":id")
  findById(
    @Param("id", ParseUUIDPipe) id: string
  ) {
    return this.restaurantsService.findById(id)
  }

  @Patch(":id")
  @UseGuards(RestaurantOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, data)
  }

  @Delete(":id")
  @UseGuards(RestaurantOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.restaurantsService.delete(id)
  }

}
