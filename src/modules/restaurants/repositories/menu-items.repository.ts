import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { INewMenuItem, IUpdateMenuItem, menuItems } from "../schemas/menu_items.schema";
import { eq, isNull, and } from "drizzle-orm";

@Injectable()
export class MenuItemsRepository {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) { }

    // ============================================
    // Private Helper - Active Menu Items
    // ============================================

    private activeMenuItems() {
        return isNull(menuItems.deleted_at)
    }

    async create(data: INewMenuItem[]) {
        const [menuItem] = await this.db.insert(menuItems).values(data).returning()
        return menuItem
    }

    findAll(where: { restaurant_id: string, category_id?: string }) {
        const conditions = [
            eq(menuItems.restaurant_id, where.restaurant_id),
            this.activeMenuItems()
        ]

        if (where.category_id) {
            conditions.push(eq(menuItems.category_id, where.category_id))
        }

        return this.db.query.menuItems
            .findMany({
                where: and(...conditions),
            })
    }

    findById(id: string) {
        return this.db.query
            .menuItems
            .findFirst({ where: and(eq(menuItems.id, id), this.activeMenuItems()) })
    }

    update(where: { id: string, restaurant_id: string, data: IUpdateMenuItem }) {
        return this.db.update(menuItems)
            .set(where.data)
            .where(and(
                eq(menuItems.id, where.id),
                eq(menuItems.restaurant_id, where.restaurant_id)
            ))
    }

    delete(where: { id: string, restaurant_id: string }) {
        return this.db.update(menuItems)
            .set({ deleted_at: new Date() })
            .where(and(
                eq(menuItems.id, where.id),
                eq(menuItems.restaurant_id, where.restaurant_id),
                this.activeMenuItems()
            ))
    }
}