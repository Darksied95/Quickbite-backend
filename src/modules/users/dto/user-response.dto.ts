import { Expose } from "class-transformer";
import { CreateUserDTO } from "./create-user.dto";

export class UserResponseDto implements Omit<CreateUserDTO, "password" | "addresses"> {
    @Expose()
    id: string

    @Expose()
    email: string;

    @Expose()
    first_name: string;

    @Expose()
    last_name: string;

    @Expose()
    phone: string;

    @Expose()
    created_at: string

    @Expose()
    updated_at: string
}