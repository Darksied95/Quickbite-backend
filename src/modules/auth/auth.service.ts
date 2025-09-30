import { Knex } from 'knex';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { UserService } from '../users/users.service';
import { HashingService } from './hashing.service';
import { AddressService } from '../addresses/addresses.service';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomerDto } from '../customers/dto/create-customers.dto';
import { LoginRequestDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { TokenService } from './token/token.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { USER_ROLES } from '../users/user.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly customerService: CustomersService,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly adminService: AdminService
  ) { }

  async createCustomer(customerData: CreateCustomerDto) {
    const userDetails = {
      email: customerData.email,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      password: await this.hashingService.hash(customerData.password),
      phone: customerData.phone,
    };

    return this.knex.transaction(async (trx) => {
      const user = await this.userService.create(userDetails, USER_ROLES.customer, trx);

      await this.addressService.create(customerData.addresses, { id: user.id, type: 'user' }, trx);
      await this.customerService.create(
        { user_id: user.id },
        trx,
      );

      return null
    });
  }

  async createRestaurantOwner(restaurantData: CreateCustomerDto) {
    const userDetails = {
      email: restaurantData.email,
      first_name: restaurantData.first_name,
      last_name: restaurantData.last_name,
      password: await this.hashingService.hash(restaurantData.password),
      phone: restaurantData.phone,
    };

    return this.knex.transaction(async (trx) => {
      const user = await this.userService.create(userDetails, USER_ROLES.restaurant_owner, trx);
      await this.addressService.create(restaurantData.addresses, { id: user.id, type: 'user' }, trx);

      return null
    });
  }

  async createAdmin(adminDetails: CreateAdminDto) {
    const { addresses: adminAddresses, ...userDetails } = adminDetails
    return this.knex.transaction(async (trx) => {
      const user = await this.userService.create(userDetails, USER_ROLES.admin, trx)
      await this.addressService.create(adminAddresses, { id: user.id, type: 'user' }, trx)
      await this.adminService.create(user.id, trx)

      return null
    })

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

    const payload = { userid: user.id, email: user.email, type: user.role }

    const { refreshToken } = await this.tokenService.createRefreshToken(user.id)

    const tokens = {
      access: await this.jwtService.signAsync(payload),
      refresh: refreshToken
    }

    return {
      user: plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
      tokens
    }

  }
}
