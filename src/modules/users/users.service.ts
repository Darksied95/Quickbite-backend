import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { UserRepository } from "./users.repository";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectConnection() private readonly knex: Knex,
        private readonly userRepository: UserRepository
    ) { }

    async create(userData: Omit<CreateUserDTO, "addresses">, trx: Knex.Transaction) {

        const existingUser = await this.knex("users").where({ email: userData.email }).first()

        console.log(existingUser);

        if (existingUser) {
            throw new ConflictException('User with this email already exists')
        }

        const user = await this.userRepository.create(userData, trx)

        if (!user) {
            throw new InternalServerErrorException("Failed to create user")
        }

        return user
    }

}