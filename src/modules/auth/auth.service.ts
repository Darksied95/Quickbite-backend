import { Knex } from "knex";
import { Injectable } from "@nestjs/common"
import { InjectConnection } from "nest-knexjs";
import { UserService } from "../users/users.service";
import { PasswordService } from "./password.service";
import { AddressService } from "../addresses/addresses.service";
import { CustomersService } from "../customers/customers.service";
import { CreateCustomerDto } from "../customers/dto/create-customers.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly customerService: CustomersService,
        private readonly userService: UserService,
        private readonly addressService: AddressService,
        private readonly passwordService: PasswordService
    ) { }

    async createCustomer(customerData: CreateCustomerDto) {

        const userDetails = {
            email: customerData.email,
            first_name: customerData.first_name,
            last_name: customerData.last_name,
            password: await this.passwordService.hashpassword(customerData.password),
            phone: customerData.phone,
            user_type: "customer"
        }

        return this.knex.transaction(async (trx) => {
            const user = await this.userService.create(userDetails, trx)
            console.log(customerData, user.id);

            const addresses = await this.addressService.create(customerData.addresses, user.id, trx)
            const customer = await this.customerService.create({ user_id: user.id }, trx)

            const { password, ...userWithoutPassword } = user
            return {
                user: userWithoutPassword,
                addresses,
                total_orders: customer.total_orders,
                total_spent: customer.total_spent
            }
        })
    }

}

