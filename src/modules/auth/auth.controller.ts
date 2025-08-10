import { Body, Controller, Get, HttpCode, Post, Req } from "@nestjs/common";
import { RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    login(): string {
        return "login"
    }

    @Post('register')
    @HttpCode(204)
    createUser(@Body() req: RegisterDto) {
        return this.authService.create(req)
    }
}