import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { MenuItemTable } from "src/database/tables/table.type";
import { MenuItem, MenuItemUpdate } from "../dtos/menu-item.dto";
import { TableNames } from "src/database/tables/table.constant";

type MenuItemWithRestaurantId = MenuItem & { restaurant_id: string }

interface IMenuITem {
    create(data: MenuItemWithRestaurantId[]): Promise<MenuItemTable[]>
    findAll(query: { restaurant_id: string, category_id?: string }): Promise<MenuItemTable[]>
    findById({ id, restaurant_id }: { id: string, restaurant_id?: string }): Promise<MenuItemTable | null>
    update(query: { id: string, data: MenuItemUpdate, restaurant_id: string }): Promise<number>
    delete(query: { id: string, restaurant_id: string }): Promise<number>
}
@Injectable()

export class MenuItemRepository implements IMenuITem {
    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    private activeItem() {
        return this.knex(TableNames.MenuItems).whereNull("deleted_at")
    }

    create(data: MenuItemWithRestaurantId[]) {
        return this.knex(TableNames.MenuItems).insert(data).returning("*")
    }

    findAll(query: { restaurant_id: string, category_id?: string; }) {
        return this.activeItem().where(query)
    }

    async findById(where: { id: string, restaurant_id?: string }) {
        const item = await this.activeItem().where(where).first()
        return item || null
    }

    update(query: { id: string; data: MenuItemUpdate; restaurant_id: string; }) {
        return this
            .activeItem()
            .where({ id: query.id, restaurant_id: query.restaurant_id })
            .update(query.data)
    }

    delete(query: { id: string; restaurant_id: string; }) {
        return this
            .activeItem()
            .where(query)
            .update({ deleted_at: this.knex.fn.now() })
    }
} 