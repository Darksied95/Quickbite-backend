import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from '../customers/dto/create-customers.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDTO, LoginResponseDTO } from './dto/login.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDetails: LoginRequestDTO): Promise<LoginResponseDTO> {
    const result = await this.authService.login(loginDetails)
    return result
  }

  @Post('register/customer')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Register a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully registered' })

  async registerCustomer(@Body() req: CreateCustomerDto) {
    return await this.authService.createCustomer(req);
  }

  @Post("register/admin")
  @HttpCode(HttpStatus.NO_CONTENT)
  async createAdmin(@Body() req: CreateAdminDto) {
    return await this.authService.createAdmin(req)
  }

  @Post('register/driver')
  @ApiOperation({ summary: 'Register a new driver' })
  @ApiResponse({ status: 201, description: 'Driver successfully registered' })
  async registerDriver(@Body() req: CreateCustomerDto) {
    return;
  }

  @Post('register/restaurant_owner')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Register a new restaurant owner' })
  @ApiResponse({
    status: 201,
    description: 'Restaurant successfully registered',
  })
  registerRestauranOwner(@Body() req: CreateCustomerDto) {
    return this.authService.createRestaurantOwner(req)
  }
}
