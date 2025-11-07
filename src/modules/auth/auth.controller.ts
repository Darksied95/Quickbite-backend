import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDTO, LoginResponseDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDetails: LoginRequestDTO): Promise<LoginResponseDTO> {
    const result = await this.authService.login(loginDetails)
    return result
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new customer/driver/restaurant' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async register(@Body() req: RegisterDTO) {
    return await this.authService.register(req)
  }


}
