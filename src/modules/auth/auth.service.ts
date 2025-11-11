import { Knex } from 'knex';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { UserService } from '../users/users.service';
import { HashingService } from './hashing.service';
import { AddressService } from '../addresses/addresses.service';
import { CustomersService } from '../customers/customers.service';
import { LoginRequestDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { TokenService } from './token/token.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AdminService } from '../admin/admin.service';
import { USER_ROLES, USER_ROLES_VALUES } from '../users/user.constant';
import { JWTPayload } from './token/token.type';
import { RegisterDTO } from './dto/register.dto';
import { UserTable } from 'src/database/tables/table.type';
import { RestaurantsService } from '../restaurants/services/restaurant.service';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly customerService: CustomersService,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly restaurantService: RestaurantsService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly adminService: AdminService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(AuthService.name)
  }


  async register(registerDto: RegisterDTO) {
    this.validateRoleSpecificData(registerDto)

    const userDetails = {
      role: registerDto.role,
      email: registerDto.email,
      phone: registerDto.phone,
      last_name: registerDto.last_name,
      first_name: registerDto.first_name,
      password: await this.hashingService.hash(registerDto.password),
    }

    const user = await this.knex.transaction(async (trx) => {
      const user = await this.userService.create(userDetails, trx)
      await this.addressService.create([registerDto.address], { id: user.id, type: 'user' }, trx)
      await this.handleRoleSpecificSetup(user, registerDto, trx)
      return user
    })

    const roleSpecificContext = await this.handleUserContextAggregration(user.id, user.role)


    const payload = { userId: user.id, email: user.email, role: user.role } satisfies JWTPayload

    const refreshToken = await this.tokenService.createRefreshToken(user.id)

    const tokens = {
      access: await this.jwtService.signAsync(payload),
      refresh: refreshToken
    }

    return {
      user: plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
      tokens,
      ...roleSpecificContext
    }
  }

  async login(loginDetails: LoginRequestDTO) {

    let user

    try {

      user = await this.userService.getUserWithEmail(loginDetails.email)

    } catch (error) {

      if (error instanceof UserNotFoundException) throw new UnauthorizedException("Invalid Credentials")

      throw error
    }

    const isvalidPassword = await this.hashingService.compare(loginDetails.password, user.password)

    if (!isvalidPassword) throw new UnauthorizedException("Invalid Credentials")

    const roleSpecificContext = await this.handleUserContextAggregration(user.id, user.role)

    this.logger.info(user.id, user.role, roleSpecificContext)

    const payload = { userId: user.id, email: user.email, role: user.role } satisfies JWTPayload

    const refreshToken = await this.tokenService.createRefreshToken(user.id)

    const tokens = {
      access: await this.jwtService.signAsync(payload),
      refresh: refreshToken
    }

    return {
      user: plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
      tokens,
      ...roleSpecificContext
    }

  }

  private validateRoleSpecificData(registerDto: RegisterDTO) {
    switch (registerDto.role) {
      case USER_ROLES.driver:
        if (!registerDto.driver) {
          throw new BadRequestException(`Missing required 'driver' field`)
        }
        break;

      case USER_ROLES.restaurant_owner:
        if (!registerDto.restaurant) {
          throw new BadRequestException(`Missing required 'restaurant' field`)
        }
        break;

      case USER_ROLES.admin:
      case USER_ROLES.customer:
        break;

      default:
        throw new BadRequestException(`Invalid role, valid roles are ${USER_ROLES_VALUES.join(",")}`)
    }
  }

  private async handleRoleSpecificSetup(user: UserTable, registerDto: RegisterDTO, trx: Knex.Transaction) {
    switch (registerDto.role) {

      case USER_ROLES.restaurant_owner:
        await this.restaurantService.create({ ...registerDto.restaurant!, owner_id: user.id }, trx)
        break;

      case USER_ROLES.customer:
        await this.customerService.create({ user_id: user.id }, trx)
        break;

      case USER_ROLES.admin:
        await this.adminService.create(user.id, trx)
        break;

      case USER_ROLES.driver:
        break;

      default:
        throw new BadRequestException('Invalid role')
    }
  }

  private async handleUserContextAggregration(userId: string, role: USER_ROLES) {
    let result: Record<string, any> = {}
    switch (role) {
      case USER_ROLES.restaurant_owner:
        const restaurants = await this.restaurantService.getAllByOwner(userId)
        result = { restaurants }
        break;

      default:
        result = {}
        break;
    }

    return result
  }

}



