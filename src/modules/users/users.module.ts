import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserRepository } from "./users.repository";

@Module({
    providers: [UserService, UserRepository],
    controllers: [],
    exports: [UserService]
})

export class UserModule { }