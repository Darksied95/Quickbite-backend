import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UserService } from "./users.service";


@Controller("users")

export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @UseGuards(AuthGuard)
    @Get("me")
    async getLoggedInUserDetails() {
        return "here"
    }

    @Get(":email")
    async getUserByEmail(@Param("email") email: string) {
        return this.userService.test(email)
    }

}