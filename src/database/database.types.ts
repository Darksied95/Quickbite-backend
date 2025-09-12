import { IUser } from "src/modules/users/users.type";
import { Knex } from "knex";
import { ICustomerProfile } from "src/modules/customers/customer.types";
import { IAddress } from "src/modules/addresses/addresses.types";

export type TypedKnex = Knex<DatabaseSchema>

export interface DatabaseSchema {
    "users": IUser,
    "customer_profiles": ICustomerProfile,
    "addresses": IAddress
}
