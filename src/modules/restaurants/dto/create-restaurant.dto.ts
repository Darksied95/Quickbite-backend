import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsPhoneNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";

export class CreateRestaurantDto {
    @IsString()
    name: string

    @IsUUID()
    owner_id: string

    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    addresses: CreateAddressDto

    @IsPhoneNumber('NG')
    phone: string

    @IsEmail()
    email: string

    @IsString()
    description: string


    @IsBoolean()
    is_active: boolean
}