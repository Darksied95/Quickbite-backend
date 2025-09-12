import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateCustomerDto } from "../customers/dto/create-customers.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomerResponseDto } from "../customers/dto/customer-response.dto";

@ApiTags("auth")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(): string {
        return "login"
    }

    @Post('register/customer')
    @ApiOperation({ summary: "Register a new customer" })
    @ApiResponse({ status: 201, description: "Customer successfully registered" })
    async registerCustomer(@Body() req: CreateCustomerDto): Promise<CustomerResponseDto> {
        return await this.authService.createCustomer(req)
    }

    @Post('register/driver')
    @ApiOperation({ summary: "Register a new driver" })
    @ApiResponse({ status: 201, description: "Driver successfully registered" })
    async registerDriver(@Body() req: CreateCustomerDto) {
        return
    }

    @Post('register/restaurant')
    @ApiOperation({ summary: "Register a new restaurant owner" })
    @ApiResponse({ status: 201, description: "Restaurant successfully registered" })
    registerRestauranOwner(@Body() req: CreateCustomerDto) {
        return
    }


}