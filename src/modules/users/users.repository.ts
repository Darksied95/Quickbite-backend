import { Injectable } from "@nestjs/common";
import { IUser } from "./users.type";
import { InjectConnection } from "nest-knexjs";
import { Knex } from "knex";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

interface IUserRepository {
    create(userData: CreateUserDTO, trx: Knex.Transaction): Promise<IUser | null>
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    update(id: string, userData: UpdateUserDto): Promise<IUser | null>
    updatePassword(id: string, passwordHash: string): Promise<void>;
    softDelete(id: string): Promise<void>
    findByUserType(userType: IUser["user_type"]): Promise<void>
}

@Injectable()

export class UserRepository implements IUserRepository {

    constructor(@InjectConnection() private readonly knex: Knex) { }

    async create(userData: CreateUserDTO, trx: Knex.Transaction): Promise<IUser | null> {
        const [user] = await trx("users").insert(userData).returning("*")
        return user

    }

    async findById(id: string): Promise<IUser | null> {
        const user = await this.knex("users").where({ id }).first()
        return user || null
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.knex("users").where({ email }).first()
        return user || null
    }

    async update(id: string, userData: UpdateUserDto): Promise<IUser | null> {
        const user = await this.knex("users").where({ id }).update(userData).returning("*").first()
        return user || null
    }

    async updatePassword(id: string, passwordHash: string): Promise<void> {
        const user = await this.knex("users").where({ id }).update({ password: passwordHash })
        return
    }

    async findByUserType(userType: IUser["user_type"]): Promise<void> {
        await this.knex<IUser>("users").where({ user_type: userType })
        return
    }

    async softDelete(id: string): Promise<void> {
        await this.knex("users").where({ id }).update({ is_active: false })
    }
}
