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

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly customerService: CustomersService,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService
  ) { }

  async createCustomer(customerData: CreateCustomerDto) {
    const userDetails = {
      email: customerData.email,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      password: await this.hashingService.hash(customerData.password),
      phone: customerData.phone,
      user_type: 'customer',
    };

    return this.knex.transaction(async (trx) => {
      const user = await this.userService.create(userDetails, trx);

      const addresses = await this.addressService.create(
        customerData.addresses,
        user.id,
        trx,
      );
      const customer = await this.customerService.create(
        { user_id: user.id },
        trx,
      );

      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        addresses,
        total_orders: customer.total_orders,
        total_spent: customer.total_spent,
      };
    });
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

    const payload = { userid: user.id, email: user.email, type: user.user_type }

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
