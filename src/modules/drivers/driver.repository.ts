import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { ICreateDriver } from "./driver.interface";
import { TableNames } from "src/database/tables/table.constant";
import { DriverProfileTable } from "src/database/tables/table.type";
import { UpdateDriverDTO } from "./dto/update-driver.dto";


interface IDriverRepository {
    create(data: ICreateDriver, trx: Knex.Transaction): Promise<DriverProfileTable>
    findById(driver_id: string): Promise<DriverProfileTable | null>
    findAll(): Promise<DriverProfileTable[]>
    findByUserId(user_id: string): Promise<DriverProfileTable | null>
    update(driver_id: string, data: UpdateDriverDTO): Promise<DriverProfileTable>
}

export class DriverRepository implements IDriverRepository {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    async create(data: ICreateDriver, trx: Knex.Transaction) {
        const [result] = await trx(TableNames.DriverProfiles).insert(data).returning("*")
        return result
    }

    async findById(driver_id: string): Promise<DriverProfileTable | null> {
        return await this.knex(TableNames.DriverProfiles).where({ id: driver_id }).first() || null
    }

    async findAll() {
        return await this.knex(TableNames.DriverProfiles).select("*")
    }

    async findByUserId(user_id: string): Promise<DriverProfileTable | null> {
        return await this.knex(TableNames.DriverProfiles).where({ user_id }).first() || null
    }

    async update(driver_id: string, data: UpdateDriverDTO) {
        const [result] = await this.knex(TableNames.DriverProfiles).where({ id: driver_id }).update(data).returning("*")
        return result
    }


}