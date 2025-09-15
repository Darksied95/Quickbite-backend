import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";


interface ITokenRepository {
    create({ user_id, token, expires_at }: { user_id: string, token: string, expires_at: Date }): any

}

export class TokenRepository implements ITokenRepository {
    constructor(@InjectConnection() private knex: Knex) { }

    async create({ user_id, token, expires_at }: { user_id: string, token: string, expires_at: Date }) {
        const [result] = await this
            .knex('tokens')
            .insert({
                user_id,
                token,
                expires_at
            })
            .returning("*")

        return result

    }
}