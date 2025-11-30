import { Inject, Injectable } from "@nestjs/common";
import { eq, and, isNull } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { restaurantProfiles } from "../schemas/restaurant_profiles.schema";

@Injectable()
export class RestaurantRepository {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) { }

    private activeRestaurants() {
        return isNull(restaurantProfiles.deleted_at)
    }

    async findById(id: string) {
        const restaurant = await this
            .db.query.restaurantProfiles
            .findFirst({ where: and(eq(restaurantProfiles.id, id), this.activeRestaurants()) })

        return restaurant || null;
    }

    async findAllActiveByOwner(ownerId: string) {
        return this
            .db.query.restaurantProfiles
            .findFirst({ where: and(eq(restaurantProfiles.owner_id, ownerId), this.activeRestaurants()) })
    }

    async delete(id: string) {
        return this.db.update(restaurantProfiles)
            .set({ deleted_at: new Date() })
            .where(and(
                eq(restaurantProfiles.id, id),
                this.activeRestaurants()
            ));
    }

    async update(id: string, data: any) {
        return this.db.update(restaurantProfiles)
            .set(data)
            .where(eq(restaurantProfiles.id, id))
    }

    async findMany() {
        return this.db.query.restaurantProfiles.findMany({ where: this.activeRestaurants })
    }
}