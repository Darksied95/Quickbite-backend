import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { VEHICLE_TYPE, VEHICLE_TYPE_VALUE } from '../driver.constants';
import { IUpdateDriver } from '../schemas/driver_profiles.schema';
import {
  type USER_STATUS,
  USER_STATUS_VALUES,
} from 'src/modules/users/user.constant';

export class UpdateDriverDTO implements IUpdateDriver {
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;

  @IsIn(VEHICLE_TYPE_VALUE)
  @IsOptional()
  vehicle_type?: VEHICLE_TYPE;

  @IsIn(USER_STATUS_VALUES)
  @IsOptional()
  status?: USER_STATUS;
}
