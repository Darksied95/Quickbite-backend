import { Injectable } from "@nestjs/common";
import { Knex } from "knex";

@Injectable()
export class AdminRepository {

    async create(user_id: string, trx: Knex.Transaction) {
        const [admin] = await trx("admin_profiles").insert({ user_id }).returning("*")
        return admin
    }
}