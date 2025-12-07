import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { VEHICLE_TYPE, VEHICLE_TYPE_VALUE } from '../driver.constants';

export class CreateDriverDTO {
  @ApiProperty({ enum: VEHICLE_TYPE_VALUE })
  @IsIn(VEHICLE_TYPE_VALUE)
  vehicleType: VEHICLE_TYPE;
}
