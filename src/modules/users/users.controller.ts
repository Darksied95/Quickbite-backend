import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";


@Controller("users")

export class UserController {

    @UseGuards(AuthGuard)
    @Get("me")
    async getLoggedInUserDetails() {
        return "here"
    }
}