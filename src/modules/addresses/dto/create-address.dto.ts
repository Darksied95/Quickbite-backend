import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    @ApiProperty({ example: "Home" })
    @IsString()
    @IsNotEmpty()
    label: string

    @ApiProperty({ example: "123 street road" })
    @IsString()
    @IsNotEmpty()
    addressLine1: string

    @ApiPropertyOptional({ example: "Near Uyo" })
    @IsString()
    @IsOptional()
    addressLine2?: string

    @ApiProperty({ example: "Uyo" })
    @IsString()
    @IsNotEmpty()
    city: string


    @ApiProperty({ example: "Akwa Ibom State" })
    @IsString()
    @IsNotEmpty()
    state: string

    @ApiProperty({ example: "Nigeria" })
    @IsString()
    @IsNotEmpty()
    country: string

    @ApiProperty({ example: "M20 4UR" })
    @IsString()
    @IsNotEmpty()
    postalCode: string

}