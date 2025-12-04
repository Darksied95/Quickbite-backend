import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { MenuItem, MenuItemUpdate } from "../dtos/menu-item.dto";
import { MenuItemsRepository } from "../repositories/menu-items.repository";
import { PinoLogger } from "nestjs-pino";
import { MenuCategoriesService } from "./menu-category.service";

@Injectable()
export class MenuItemService {
    constructor(
        private readonly menuItemRepo: MenuItemsRepository,
        private readonly menuCategoryService: MenuCategoriesService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(MenuItemService.name)
    }

    async create(restaurant_id: string, items: MenuItem[]) {

        const payload = items.map(item => ({
            ...item,
            restaurant_id
        }))

        const category_ids = payload.map(e => e.category_id)
        const existingCategories = await this.menuCategoryService.findByIds(category_ids, restaurant_id)
        const validIds = new Set(existingCategories.map(e => e.id))
        const invalidIds = category_ids.filter(id => !validIds.has(id))

        if (invalidIds.length > 0) {
            throw new BadRequestException(`Invalid Category IDs: ${invalidIds.join(", ")}`)
        }

        return this.menuItemRepo.create(payload)
    }

    findAll(filters: { restaurant_id: string, category_id?: string }) {
        const where: { restaurant_id: string, category_id?: string } = { restaurant_id: filters.restaurant_id }

        if (filters.category_id) {
            where["category_id"] = filters.category_id
        }
        return this.menuItemRepo.findAll(where)
    }

    findById(id: string) {
        return this.menuItemRepo.findById(id)
    }

    findByIds(ids: string[]) {
        return this.menuItemRepo.findByIds(ids)
    }

    async update(id: string, restaurant_id: string, data: MenuItemUpdate) {
        const item = await this.menuItemRepo.findById(id)

        if (!item) {
            throw new NotFoundException('Item not found')
        }

        if (item.restaurant_id !== restaurant_id) {
            this.logger.warn({ menuItemId: id, attemptedBy: restaurant_id }, 'Authorization failure')
            throw new ForbiddenException('Access denied')
        }

        return this.menuItemRepo.update({ id, restaurant_id, data })
    }

    async delete(id: string, restaurant_id: string) {
        return this.menuItemRepo.delete({ id, restaurant_id })
    }


} 