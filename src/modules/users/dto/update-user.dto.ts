import { PartialType, PickType } from "@nestjs/mapped-types"
import { CreateUserDTO } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
    PickType(CreateUserDTO, ["first_name", "last_name", "phone"] as const)
) { }