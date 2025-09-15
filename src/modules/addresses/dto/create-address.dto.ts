import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Home' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: '123 street road' })
  @IsString()
  @IsNotEmpty()
  street_address: string;

  @ApiProperty({ example: '12B' })
  @IsString()
  @IsNotEmpty()
  apartment_unit: string;

  @ApiProperty({ example: 'Uyo' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Akwa Ibom State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'M20 4UR' })
  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_default: boolean;
}
