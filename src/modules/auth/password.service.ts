import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordService {


    private readonly saltRounds = 10

    async hashpassword(password: string) {
        return bcrypt.hash(password, this.saltRounds)
    }

    async comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword)
    }
}