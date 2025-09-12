import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsPhoneNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";

export class CreateUserDTO {
    @ApiProperty({ example: "email@quickbite.com" })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string

    @ApiProperty({ example: "+2347012345678" })
    @IsPhoneNumber("NG")
    phone: string

    @ApiProperty({ example: "Rajah" })
    @IsString()
    @MinLength(3)
    first_name: string

    @ApiProperty({ example: "Jojo" })
    @IsString()
    @MinLength(3)
    last_name: string

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    addresses: CreateAddressDto[]
}