import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";
import { CreateDriverDTO } from "src/modules/drivers/dto/create-drivers.dto";
import { CreateRestaurantDto } from "src/modules/restaurants/dto/create-restaurant.dto";
import { CreateUserDTO } from "src/modules/users/dto/create-user.dto";

export class RegisterDTO extends CreateUserDTO {

    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto

    @ValidateNested()
    @Type(() => CreateDriverDTO)
    driver?: CreateDriverDTO

    @ValidateNested()
    @Type(() => CreateRestaurantDto)
    restaurant?: CreateRestaurantDto
}