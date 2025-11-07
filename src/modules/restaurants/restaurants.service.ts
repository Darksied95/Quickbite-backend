import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { AddressService } from '../addresses/addresses.service';
import { RestaurantRepository } from './restaurants.repository';


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

    private async validateUserEligibility(ownerId: string) {
        const existingRestaurant = await this.restaurantRepository.findApprovedByOwnerId(ownerId)

        if (existingRestaurant) {
            throw new ConflictException('User already has a restaurant')
        }



    }
}


