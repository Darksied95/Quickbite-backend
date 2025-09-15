//email ,password , phone, restaurantName, description , cusineTypes, restaurantAddress , businessLicense,

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/addresses/dto/create-address.dto';

export class CreateRestaurantsOwnerDto {
  @ApiProperty({ example: 'star@gmail.com' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '+2347012345678' })
  @IsPhoneNumber('NG')
  phone: string;

  @ApiProperty({ example: 'Rajah Cuisine' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  restuarantName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: ['Nigerian', 'Continental'] })
  @IsArray()
  @IsString({ each: true })
  cuisineTypes: Array<string>;

  @ApiProperty({ example: 'BXH1239PIO' })
  @IsOptional()
  @IsString()
  businessLicense?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
