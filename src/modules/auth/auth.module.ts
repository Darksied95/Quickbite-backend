import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { UserModule } from "../users/users.module";
import { AddressModule } from "../addresses/addresses.module";
import { CustomersModule } from "../customers/customers.module";


@Module({
    imports: [UserModule, AddressModule, CustomersModule],
    controllers: [AuthController],
    providers: [AuthService, PasswordService],

})

export class AuthModule { }