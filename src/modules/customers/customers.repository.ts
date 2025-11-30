import { Injectable } from "@nestjs/common";
import { DrizzleTransaction } from "src/database/drizzle.module";
import { customerProfiles } from "./customers.schema";

@Injectable()
export class CustomerRepository {

    async create(data: any, trx: DrizzleTransaction) {
        const [customer] = await trx.insert(customerProfiles).values(data).returning()
        return customer
    }
}