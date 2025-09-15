import { randomBytes } from "node:crypto";
import { TokenRepository } from "./token.repository";
import { HashingService } from "../hashing.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TokenService {
    constructor(
        private tokenRepository: TokenRepository,
        private readonly hashingService: HashingService

    ) { }

    async createRefreshToken(user_id: string) {

        const token = randomBytes(64).toString("hex")
        const hashedToken = await this.hashingService.hash(token)

        await this.tokenRepository.create({
            user_id,
            token: hashedToken,
            expires_at: new Date(Date.now() + (30 * 20 * 60 * 60 * 1000))
        })

        return { refreshToken: token }
    }
}