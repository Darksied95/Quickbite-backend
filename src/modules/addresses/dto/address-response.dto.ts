import { Expose } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";

export class AddressResponseDTO implements CreateAddressDto {
    @Expose()
    id: string

    @Expose()
    label: string;

    @Expose()
    street_address: string

    @Expose()
    apartment_unit: string

    @Expose()
    city: string;

    @Expose()
    country: string;

    @Expose()
    postal_code: string;

    @Expose()
    is_default: boolean;

    @Expose()
    state: string;

    @Expose()
    created_at: string

    @Expose()
    updated_at: string
}
