import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthService {
    private readonly users: any[] = []

    create(user: any) {
        const result = this.users.push(user);
        return {
            message: "success",
            result
        }
    }

    findAll() {
        return this.users
    }
}