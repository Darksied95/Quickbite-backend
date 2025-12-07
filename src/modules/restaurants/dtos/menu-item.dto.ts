import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class MenuItem {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsBoolean()
  @IsOptional()
  is_available?: boolean = true;

  @IsUrl()
  @IsOptional()
  image_url?: string;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @IsNumber()
  @IsInt()
  stock: number;
}

export class CreateMenuItemDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MenuItem)
  items: MenuItem[];
}

export class MenuItemUpdate extends PartialType(MenuItem) {}
