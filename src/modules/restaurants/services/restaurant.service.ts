import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dtos/create-restaurant.dto';
import { AddressService } from '../../addresses/addresses.service';
import { DRIZZLE, DrizzleDb, DrizzleTransaction } from 'src/database/drizzle.module';
import { restaurantProfiles } from '../schemas/restaurant_profiles.schema';
import { RestaurantRepository } from '../repositories/restaurant.repository';


@Injectable()

export class RestaurantsService {
    constructor(
        private readonly addressService: AddressService,
        @Inject(DRIZZLE) private readonly db: DrizzleDb,
        private readonly restaurantRepository: RestaurantRepository,
    ) { }


    create(data: CreateRestaurantDto & { owner_id: string }, trx?: DrizzleTransaction,) {
        const executeCreate = async (trx: DrizzleTransaction) => {
            const payload = {
                name: data.name,
                owner_id: data.owner_id,
                phone: data.phone,
                email: data.email,
                description: data.description,
            }
            const [restaurant] = await trx.insert(restaurantProfiles).values(payload).returning()
            await this.addressService.create([data.address], { id: restaurant.id, type: 'restaurant' }, trx)
            return restaurant
        }
        return trx ? executeCreate(trx) : this.db.transaction(executeCreate)
    }

    getAll() {
        return this.restaurantRepository.findMany()
    }

    getAllByOwner(owner_id: string) {
        return this.restaurantRepository.findAllActiveByOwner(owner_id)
    }

    async findById(id: string) {
        const restaurant = this.restaurantRepository.findById(id)

        if (!restaurant) {
            throw new NotFoundException(`Restaurant with id ${id} not found`)
        }
        return restaurant
    }

    update(id: string, data: UpdateRestaurantDto) {
        return this.restaurantRepository.update(id, data)
    }

    delete(restaurant_id: string) {
        return this.restaurantRepository.delete(restaurant_id)
    }
}


