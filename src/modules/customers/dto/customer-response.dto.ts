import { AddressResponseDTO } from "src/modules/addresses/dto/address-response.dto";
import { UserResponseDto } from "src/modules/users/dto/user-response.dto";

export class CustomerResponseDto {
    user: UserResponseDto
    addresses: AddressResponseDTO[]
}