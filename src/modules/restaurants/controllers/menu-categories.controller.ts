import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { MenuCategoryDTO, UpdateMenuCategoryDTO } from "../dto/create-menu-category.dto";
import { MenuCategoriesService } from "../services/menu-categories.service";
import { RestaurantOwnerGuard } from "../restaurant-owner.guard";

@Controller('restaurants/:restaurantId/menu-categories')

export class MenuCategoriesController {

    constructor(
        private readonly menuCategoriesService: MenuCategoriesService
    ) { }

    @Post()
    @UseGuards(AuthGuard, RestaurantOwnerGuard)
    async create(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Body() category: MenuCategoryDTO
    ) {
        return await this.menuCategoriesService.create(category, restaurantId)
    }

    @Get()
    async getAll(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    ) {
        return await this.menuCategoriesService.findAll(restaurantId)
    }

    @Get(":id")
    async get(
        @Param("id", ParseUUIDPipe) id: string
    ) {
        return await this.menuCategoriesService.find(id)
    }

    @Patch(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard, RestaurantOwnerGuard)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() update: UpdateMenuCategoryDTO
    ) {
        return await this.menuCategoriesService.update(id, update)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard, RestaurantOwnerGuard)

    async delete(
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return await this.menuCategoriesService.delete(id)
    }
}

