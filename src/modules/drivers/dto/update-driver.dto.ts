import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { VEHICLE_TYPE } from "../driver.constants";

export class UpdateDriverDTO {
    @IsBoolean()
    @IsOptional()
    is_available?: boolean

    @IsEnum(VEHICLE_TYPE)
    @IsOptional()
    vehicle_type?: VEHICLE_TYPE
}