import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { TableNames } from "src/database/tables/table.constant";
import { RestaurantProfileTable } from "src/database/tables/table.type";
import { Restaurant_APPROVAL_STATES } from "../restaurant.constant";
import { InjectConnection } from "nest-knexjs";
import { CreateRestaurantDto } from "../dtos/create-restaurant.dto";


type CreateRestaurantInRepository = Omit<CreateRestaurantDto, 'address' | 'image'> & { logo_url?: string };
type UpdateResturantInRepository = Partial<CreateRestaurantInRepository>

interface Restaurant {
    create(data: CreateRestaurantInRepository, trx: Knex.Transaction): Promise<RestaurantProfileTable>
    findById(id: string): Promise<RestaurantProfileTable | null>
    findAll(query: { owner_id?: string }): Promise<RestaurantProfileTable[]>
    update(id: string, data: UpdateResturantInRepository): Promise<number>
    delete(id: string): Promise<number>
}

@Injectable()
export class RestaurantRepository implements Restaurant {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    private activeRestaurant() {
        return this.knex(TableNames.RestaurantProfiles).whereNull('deleted_at')
    }

    async create(data: CreateRestaurantInRepository, trx: Knex.Transaction) {
        const [restaurant] = await trx.insert(data).into(TableNames.RestaurantProfiles).returning('*')
        return restaurant
    }

    async findById(id: string) {
        const restaurant = await this.activeRestaurant().where({ id }).first();
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
        return await this.activeRestaurant().where(query)
    }

    update(id: string, data: UpdateResturantInRepository) {
        return this.activeRestaurant().where({ id }).update(data)
    }

    delete(id: string) {
        return this.activeRestaurant().where({ id }).update({ deleted_at: new Date() })
    }
}