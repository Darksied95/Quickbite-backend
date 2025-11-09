import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { MenuCategoryDTO, UpdateMenuCategoryDTO } from "../dtos/create-menu-category.dto";
import { TableNames } from "src/database/tables/table.constant";
import { MenuCategoryTable } from "src/database/tables/table.type";


interface IMenuCategories {
    create(data: MenuCategoryDTO): Promise<MenuCategoryTable>,
    findAll(restaurant_id: string): Promise<MenuCategoryTable[]>
    find(id: string): Promise<MenuCategoryTable | null>
    update(id: string, data: UpdateMenuCategoryDTO): Promise<MenuCategoryTable>
    delete(id: string): Promise<number>
}

@Injectable()
export class MenuCategoriesRepository implements IMenuCategories {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    async create(data: MenuCategoryDTO) {
        const [category] = await this.knex(TableNames.MenuCategories)
            .insert(data)
            .returning("*")

        return category
    }

    findAll(restaurant_id: string) {
        return this.knex(TableNames.MenuCategories).where({ restaurant_id })
    }

    async update(id: string, data: UpdateMenuCategoryDTO) {
        const [update] = await this.knex(TableNames.MenuCategories)
            .where({ id })
            .update(data)
            .returning("*")

        return update
    }

    async find(id: string) {
        const category = await this.knex(TableNames.MenuCategories).where({ id }).first()
        return category || null
    }

    delete(id: string) {
        return this.knex(TableNames.MenuCategories).where({ id }).del()
    }
}