import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { type INewMenuCategory, IUpdateMenuCategory, menuCategories } from "../schemas/menu_categories.schema";
import { and, eq, isNull, inArray } from "drizzle-orm";

@Injectable()
export class MenuCategoriesRepository {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) { }

    // ============================================
    // Private Helper - Active Menu Categories
    // ============================================

    private activeMenuCategories() {
        return isNull(menuCategories.deleted_at)
    }

    async create(data: INewMenuCategory) {
        const [menuCategory] = await this.db.insert(menuCategories).values(data).returning()
        return menuCategory
    }

    findAll(restaurant_id: string) {
        return this.db.query.menuCategories
            .findMany({
                where: and(
                    eq(menuCategories.restaurant_id, restaurant_id),
                    this.activeMenuCategories())
            })
    }
    findById(id: string) {
        return this.db.query
            .menuCategories
            .findFirst({ where: and(eq(menuCategories.id, id), this.activeMenuCategories()) })
    }

    findByIds(ids: string[], restaurant_id: string) {
        return this.db.query
            .menuCategories
            .findMany({ where: and(inArray(menuCategories.id, ids), eq(menuCategories.restaurant_id, restaurant_id)) })
    }

    async delete(id: string) {
        const deleteCount = await this.db
            .update(menuCategories)
            .set({ deleted_at: new Date() })
            .where(and(eq(menuCategories.id, id), this.activeMenuCategories()))
            .returning()

        return deleteCount
    }

    update(id: string, data: IUpdateMenuCategory) {
        return this.db.update(menuCategories)
            .set(data)
            .where(eq(menuCategories.id, id))
    }
}