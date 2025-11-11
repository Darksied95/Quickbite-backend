import { Injectable } from "@nestjs/common";
import { CreateRestaurantInRepository } from "../restaurant.type";
import { Knex } from "knex";
import { TableNames } from "src/database/tables/table.constant";
import { RestaurantProfileTable } from "src/database/tables/table.type";
import { Restaurant_APPROVAL_STATES } from "../restaurant.constant";
import { InjectConnection } from "nest-knexjs";

interface Restaurant {
    create(data: CreateRestaurantInRepository, trx: Knex.Transaction): Promise<RestaurantProfileTable>
    findOne(id: string): Promise<RestaurantProfileTable | null>
    findAll(query: { owner_id?: string }): Promise<RestaurantProfileTable[]>
}
@Injectable()
export class RestaurantRepository implements Restaurant {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    async create(data: CreateRestaurantInRepository, trx: Knex.Transaction) {
        const [restaurant] = await trx.insert(data).into(TableNames.RestaurantProfiles).returning('*')
        return restaurant
    }

    async findOne(id: string) {
        const restaurant = await this.knex(TableNames.RestaurantProfiles).where({ id }).first();
        return restaurant || null
    }

    async findApprovedByOwnerId(owner_id: string) {
        const restaurant = await this.knex(TableNames.RestaurantProfiles).where({ owner_id, status: Restaurant_APPROVAL_STATES.Approved }).first()
        return restaurant || null
    }

    async hasActiveRestaurant(owner_id: string) {
        const blockingStatuses = [Restaurant_APPROVAL_STATES.Approved, Restaurant_APPROVAL_STATES.Pending]

        const restaurant = await this
            .knex(TableNames.RestaurantProfiles)
            .where({ owner_id })
            .whereIn('status', blockingStatuses)
            .first()
        return restaurant || null
    }

    async findAll(query: { owner_id?: string }) {
        return await this.knex(TableNames.RestaurantProfiles).where(query)
    }
}