import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { TableNames } from "src/database/tables/table.constant";

@Injectable()
export class AdminRepository {

    async create(user_id: string, trx: Knex.Transaction) {
        const [admin] = await trx(TableNames.AdminProfiles).insert({ user_id }).returning("*")
        return admin
    }
}