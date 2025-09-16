import { Type } from "class-transformer";
import { ValidateNested, IsArray, ArrayMinSize } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";
import { CreateUserDTO } from "src/modules/users/dto/create-user.dto";

export class CreateAdminDto extends CreateUserDTO {
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    @IsArray()
    @ArrayMinSize(1)
    addresses: CreateAddressDto[];
}