import { Injectable } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesRepository } from "./addresses.repository";
import { Knex } from "knex";

@Injectable()
export class AddressService {
    constructor(private readonly addressesRepository: AddressesRepository) { }

    async create(addresses: CreateAddressDto[], user_id: string, trx: Knex.Transaction) {
        console.log("here");
        const addresseswithUserId = addresses.map(address => ({ ...address, user_id }))

        return await this.addressesRepository.create(addresseswithUserId, trx)
    }
}