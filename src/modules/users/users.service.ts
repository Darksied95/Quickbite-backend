import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { UserRepository } from './users.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { IUserRole } from './users.type';

@Injectable()
export class UserService {

  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly userRepository: UserRepository,
  ) { }

  async create(
    userData: Omit<CreateUserDTO, 'addresses'>,
    role: IUserRole,
    trx: Knex.Transaction,
  ) {
    const existingUser = await this.userRepository.findByEmail(userData.email)

    if (existingUser) throw new ConflictException('User with this email already exists');

    const user = await this.userRepository.create({ ...userData, role }, trx);

    if (!user) throw new InternalServerErrorException('Failed to create user');

    return user;
  }

  async getUserWithEmail(email: string) {

    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new UserNotFoundException(email)

    return user
  }
}
