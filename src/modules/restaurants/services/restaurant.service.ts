import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from '../dtos/create-restaurant.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { AddressService } from '../../addresses/addresses.service';
import { RestaurantRepository } from '../repositories/restaurant.repository';


@Injectable()
export class RestaurantsService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly addressService: AddressService,
        private readonly restaurantRepository: RestaurantRepository
    ) { }

    create(data: CreateRestaurantDto, trx?: Knex.Transaction) {
        const executeCreate = async (trx: Knex.Transaction) => {
            const payload = {
                name: data.name,
                owner_id: data.owner_id,
                phone: data.phone,
                email: data.email,
                description: data.description,
            }
            const restaurant = await this.restaurantRepository.create(payload, trx)
            await this.addressService.create([data.address], { id: restaurant.id, type: 'restaurant' }, trx)
            return restaurant
        }
        return trx ? executeCreate(trx) : this.knex.transaction(executeCreate)
    }

    async getAll() {
        const restaurants = await this.restaurantRepository.findAll({})
        return restaurants
    }

    async getAllByOwner(owner_id: string) {
        const restaurant = await this.restaurantRepository.findAll({ owner_id })
        return restaurant
    }
}


