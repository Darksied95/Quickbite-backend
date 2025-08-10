import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @IsEmail()
    @MinLength(3)
    email: string

    @IsString()
    @MinLength(3)
    password: string

    @IsString()
    @MinLength(3)
    first_name: string

    @IsString()
    @MinLength(3)
    last_name: string
}