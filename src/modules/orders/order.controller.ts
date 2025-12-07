import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RestaurantOwnerGuard } from '../restaurants/restaurant-owner.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRestaurantOwnerGuard } from './order-restaurant-owner.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JWTPayload } from '../auth/token/token.type';

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles('customer')
  async create(@Body() body: CreateOrderDto, @CurrentUser() user: JWTPayload) {
    return this.orderService.create(user.userId, body);
  }

  @Get('customer')
  @Roles('customer')
  getCustomerOrders(@CurrentUser() user: JWTPayload) {
    return this.orderService.getAllForCustomer(user.userId);
  }

  @Get('restaurant/:restaurantId')
  @UseGuards(RestaurantOwnerGuard)
  getRestaurantOrders(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
  ) {
    return this.orderService.getAllForRestaurant(restaurantId);
  }

  @Patch(':orderId/accept')
  @Roles('restaurant_owner')
  @UseGuards(OrderRestaurantOwnerGuard)
  acceptOrder(@Param('orderId') orderId: string) {
    return this.orderService.acceptOrder(orderId);
  }

  @Patch(':orderId/ready')
  @Roles('restaurant_owner')
  @UseGuards(OrderRestaurantOwnerGuard)
  readyForPickup(@Param('orderId') orderId: string) {
    return this.orderService.readyForPickup(orderId);
  }

  @Patch(':orderId/reject')
  @Roles('restaurant_owner')
  @UseGuards(OrderRestaurantOwnerGuard)
  rejectOrder(@Param('orderId') orderId: string) {
    return this.orderService.rejectOrder(orderId);
  }

  @Patch(':orderId/unassignDriver')
  @Roles('restaurant_owner')
  @UseGuards(OrderRestaurantOwnerGuard)
  unassignDriver(
    @Param('orderId') orderId: string,
    @Body() body: { reason: string },
  ) {
    if (!body.reason || body.reason.length < 10) {
      throw new BadRequestException('Reason must be at least 10 characters');
    }
    return this.orderService.unassignDriver(orderId, body.reason);
  }
}
