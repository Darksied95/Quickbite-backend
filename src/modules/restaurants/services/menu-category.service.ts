import { Injectable, NotFoundException } from "@nestjs/common";
import { MenuCategoriesRepository } from "../repositories/menu-categories.repository";
import { MenuCategoryDTO, UpdateMenuCategoryDTO } from "../dtos/create-menu-category.dto";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class MenuCategoriesService {
    constructor(
        private readonly menuCategoriesRepo: MenuCategoriesRepository,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(MenuCategoriesService.name)
    }

    async create(data: MenuCategoryDTO, restaurant_id: string) {
        const payload = {
            ...data,
            restaurant_id
        }
        return await this.menuCategoriesRepo.create(payload)
    }

    findAll(restaurant_id: string) {
        return this.menuCategoriesRepo.findAll(restaurant_id)
    }

    update(id: string, data: UpdateMenuCategoryDTO) {
        return this.menuCategoriesRepo.update(id, data)
    }

    find(id: string) {
        return this.menuCategoriesRepo.findById(id)
    }

    findByIds(ids: string[], restaurant_id: string) {
        return this.menuCategoriesRepo.findByIds(ids, restaurant_id)
    }

    async delete(id: string) {
        const deletedItem = await this.menuCategoriesRepo.delete(id)

        if (!deletedItem) {
            throw new NotFoundException('Category not found.')
        }

        return
    }
}