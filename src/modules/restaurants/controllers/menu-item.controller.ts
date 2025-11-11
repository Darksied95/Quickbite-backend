import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { MenuItemService } from "../services/menu-item.service";
import { CreateMenuItemDTO, MenuItemUpdate } from "../dtos/menu-item.dto";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { RestaurantOwnerGuard } from "../restaurant-owner.guard";
import { GetMenuItem } from "../dtos/get-menu-item.dto";

@Controller('/restaurants/:restaurantId/menu-items')

@UseGuards(AuthGuard)
export class MenuItemController {
    constructor(
        private readonly menuItemService: MenuItemService,
    ) {

    }

    @Post()
    @UseGuards(RestaurantOwnerGuard)
    create(
        @Param('restaurantId', ParseUUIDPipe) restaurant_id: string,
        @Body() body: CreateMenuItemDTO
    ) {
        return this.menuItemService.create(restaurant_id, body.items)
    }

    @Get()
    findAll(
        @Param("restaurantId", ParseUUIDPipe) restaurant_id: string,
        @Query() query: GetMenuItem
    ) {
        console.log({ ...query, restaurant_id }, 'QUERY DATA')
        return this.menuItemService.findAll({ ...query, restaurant_id })
    }

    @Get(":id")
    findById(
        @Param("id", ParseUUIDPipe) id: string,
        @Param("restaurantId", ParseUUIDPipe) restaurant_id: string,
    ) {
        return this.menuItemService.findById(id, restaurant_id)
    }

    @Patch(":id")
    @UseGuards(RestaurantOwnerGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Param("restaurantId", ParseUUIDPipe) restaurant_id: string,
        @Body() data: MenuItemUpdate
    ) {
        return this.menuItemService.update(id, restaurant_id, data)
    }

    @Delete(":id")
    @UseGuards(RestaurantOwnerGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param("id", ParseUUIDPipe) id: string,
        @Param("restaurantId", ParseUUIDPipe) restaurant_id: string,
        @Body() data: MenuItemUpdate
    ) {
        return this.menuItemService.delete(id, restaurant_id)
    }
}