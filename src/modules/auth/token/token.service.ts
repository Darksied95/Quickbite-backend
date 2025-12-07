import { randomBytes } from 'node:crypto';
import { HashingService } from '../hashing.service';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE, DrizzleDb } from 'src/database/drizzle.module';
import { tokens } from './token.schema';

@Injectable()
export class TokenService {
  constructor(
    private readonly hashingService: HashingService,
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
  ) {}

  async createRefreshToken(user_id: string) {
    const token = randomBytes(64).toString('hex');
    const hashedToken = await this.hashingService.hash(token);
    const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

    await this.db.insert(tokens).values({
      token: hashedToken,
      user_id,
      expires_at: new Date(Date.now() + THIRTY_DAYS_IN_MS),
    });

    return token;
  }
}
