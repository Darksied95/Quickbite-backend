import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dtos/create-restaurant.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { AddressService } from '../../addresses/addresses.service';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { USER_ROLES } from 'src/modules/users/user.constant';


@Injectable()

export class RestaurantsService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly addressService: AddressService,
        private readonly restaurantRepository: RestaurantRepository
    ) { }


    create(data: CreateRestaurantDto & { owner_id: string }, role: USER_ROLES, trx?: Knex.Transaction,) {

        if (role !== USER_ROLES.restaurant_owner) {
            throw new ForbiddenException('You do not have permission to create a restaurant')
        }
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
}


