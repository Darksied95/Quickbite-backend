//email ,password, phone , firstName , lastName, DOB, address

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength, IsDateString, IsOptional, ValidateNested } from "class-validator";
import { AddressDto } from "src/common/dto/address.dto";

export class CreateCustomerDto {
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
    firstName: string

    @ApiProperty({ example: "Jojo" })
    @IsString()
    @MinLength(3)
    lastName: string

    @ApiPropertyOptional({ example: "1990-05-30" })
    @IsOptional()
    @IsDateString()
    dateOfBirth?: string

    @ApiProperty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto
}