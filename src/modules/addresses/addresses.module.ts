import { Module } from "@nestjs/common";
import { AddressService } from "./addresses.service";
import { AddressesRepository } from "./addresses.repository";

@Module({
    providers: [AddressService, AddressesRepository],
    exports: [AddressService]
})
export class AddressModule { }