import {
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { DRIZZLE, DrizzleDb, DrizzleTransaction } from 'src/database/drizzle.module';
import { users } from 'src/database/drizzle.schema';
import { eq } from 'drizzle-orm';


@Injectable()
export class UserService {

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) { }

  async create(
    userData: Omit<CreateUserDTO, 'addresses'>,
    trx: DrizzleTransaction,
  ) {
    const existingUser = await trx.query.users.findFirst({
      where: eq(users.email, userData.email),
    })

    if (existingUser) throw new ConflictException('User with this email already exists');

    const [user] = await trx.insert(users).values(userData).returning();

    return user;
  }

  async getUserWithEmail(email: string) {

    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) throw new UserNotFoundException(email)

    return user
  }
}
