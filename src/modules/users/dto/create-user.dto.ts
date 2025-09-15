import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'email@quickbite.com' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '+2347012345678' })
  @IsPhoneNumber('NG', { message: 'Invalid phone number' })
  phone: string;

  @ApiProperty({ example: 'Rajah' })
  @IsString()
  @MinLength(3)
  first_name: string;

  @ApiProperty({ example: 'Jojo' })
  @IsString()
  @MinLength(3)
  last_name: string;
}
