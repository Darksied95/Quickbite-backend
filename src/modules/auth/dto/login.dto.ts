import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { TokenDTO } from './token.dto';

export class LoginRequestDTO {
    @ApiProperty({ example: 'rajah@quickbites.com' })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}


export class LoginResponseDTO {
    user: UserResponseDto
    tokens: TokenDTO
}