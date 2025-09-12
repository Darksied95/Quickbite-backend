import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {
    @ApiProperty({ example: "rajah@quickbites.com" })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string


    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string
}