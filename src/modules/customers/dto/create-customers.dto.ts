import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";
import { CreateUserDTO } from "src/modules/users/dto/create-user.dto";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateCustomerDto extends CreateUserDTO {
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    @IsArray()
    @ArrayMinSize(1)
    addresses: CreateAddressDto[];
}