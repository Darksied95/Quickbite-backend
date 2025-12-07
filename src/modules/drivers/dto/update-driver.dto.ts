import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { VEHICLE_TYPE, VEHICLE_TYPE_VALUE } from '../driver.constants';

export class UpdateDriverDTO {
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;

  @IsIn(VEHICLE_TYPE_VALUE)
  @IsOptional()
  vehicle_type?: VEHICLE_TYPE;
}
