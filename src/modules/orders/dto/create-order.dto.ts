import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @IsUUID()
  menu_item_id: string;

  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ArrayMinSize(1)
  orders: OrderItemDto[];

  @IsUUID()
  address_id: string;
}
