import { Injectable } from '@nestjs/common';
import { USER_ROLES } from './user.constant';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTable } from 'src/database/tables/table.type';


type IUserRole = typeof USER_ROLES[number];

interface IUserRepository {
  create(userData: CreateUserDTO & { role: IUserRole }, trx: Knex.Transaction): Promise<UserTable | null>;
  findById(id: string): Promise<UserTable | null>;
  findByEmail(email: string): Promise<UserTable | null>;
  update(id: string, userData: UpdateUserDto): Promise<UserTable | null>;
  updatePassword(id: string, passwordHash: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  findByUserType(userType: UserTable['role']): Promise<void>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async create(
    userData: CreateUserDTO & { role: IUserRole },
    trx: Knex.Transaction,
  ): Promise<UserTable | null> {
    const [user] = await trx('users').insert(userData).returning('*');
    return user;
  }

  async findById(id: string): Promise<UserTable | null> {
    const user = await this.knex('users').where({ id }).first();
    return user || null;
  }

  async findByEmail(email: string): Promise<UserTable | null> {
    const user = await this.knex('users').where({ email }).first();
    return user || null;
  }

  async update(id: string, userData: UpdateUserDto): Promise<UserTable | null> {
    const user = await this.knex('users')
      .where({ id })
      .update(userData)
      .returning('*')
      .first();
    return user || null;
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    const user = await this.knex('users')
      .where({ id })
      .update({ password: passwordHash });
    return;
  }

  async findByUserType(userType: UserTable['role']): Promise<void> {
    await this.knex<UserTable>('users').where({ role: userType });
    return;
  }

  async softDelete(id: string): Promise<void> {
    await this.knex('users').where({ id }).update({ is_active: false });
  }
}
