import { Type } from "class-transformer";
import { IsEmail, IsObject, IsOptional, IsPhoneNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";

export class CreateRestaurantDto {
    @IsString()
    name: string

    @IsUUID()
    @IsOptional()
    owner_id?: string

    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto

    @IsPhoneNumber('NG')
    phone: string

    @IsEmail()
    email: string

    @IsString()
    description: string
}