import { BadRequestException, Body, Controller, ForbiddenException, Get, Inject, NotFoundException, Param, ParseUUIDPipe, Post, Req, UseGuards } from "@nestjs/common";
import { OrderService } from "./services/order.service";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { Request } from "express";
import { RestaurantOwnerGuard } from "../restaurants/restaurant-owner.guard";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {

    }

    @Post()
    @Roles('customer')
    async create(
        @Body() body: CreateOrderDto,
        @Req() req: Request
    ) {
        return this.orderService.create(req.user?.userId!, body)
    }

    @Get('customer')
    @Roles('customer')
    getCustomerOrders(
        @Req() req: Request
    ) {
        return this.orderService.getAllForCustomer(req.user?.userId!)
    }

    @Get('restaurant/:restaurantId')
    @UseGuards(RestaurantOwnerGuard)
    getRestaurantOrders(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    ) {
        return this.orderService.getAllForRestaurant(restaurantId)
    }

}