import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Logger } from 'nestjs-pino';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  providers: [
    Logger,
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService, Logger],
      useFactory: (configService: ConfigService, logger: Logger) => {
        const redis = new Redis({
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
          retryStrategy(times) {
            const delay = Math.min(times * 50, 3000);
            return delay;
          },
          maxRetriesPerRequest: 3,
        });

        redis.on('error', (err) => {
          logger.error({ err }, 'Redis connection error');
        });

        redis.on('connect', () => {
          logger.log('Redis connected');
        });
        return redis;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
