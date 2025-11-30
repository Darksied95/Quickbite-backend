import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
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
    const existingUser = await this.db.query.users.findFirst({
      where: eq(users, userData.email),
    })

    if (existingUser) throw new ConflictException('User with this email already exists');

    const [user] = await trx.insert(users).values(userData).returning();

    if (!user) throw new InternalServerErrorException('Failed to create user');

    return user;
  }

  async getUserWithEmail(email: string) {

    const user = await this.db.query.users.findFirst({
      where: eq(users, email),
    })

    if (!user) throw new UserNotFoundException(email)

    return user
  }

  async test(email: string) {
    const user = await this.db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) throw new UserNotFoundException(email)

    return user
  }
}
