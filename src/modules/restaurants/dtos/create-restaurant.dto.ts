import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsObject, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";

export class CreateRestaurantDto {
    @IsString()
    name: string

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


export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) { }