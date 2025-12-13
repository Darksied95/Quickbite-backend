import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';
import { DrizzleModule } from './database/drizzle.module';
import { AdminModule } from './modules/admin/admin.module';
import { REDIS_CLIENT, RedisModule } from './modules/redis/redis.module';
import { OrderModule } from './modules/orders/order.module';
import { loggerConfig } from './common/config/logger.config';
import { ReviewModule } from './modules/reviews/reviews.module';
import { hours, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DeliveryModule } from './modules/deliveries/delivery.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RestaurantsModule } from './modules/restaurants/restaurant.module';
import { DomainExceptionFilter } from './exceptions/domain-exception.filter';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import Redis from 'ioredis';

@Module({
  imports: [
    RedisModule,
    ThrottlerModule.forRootAsync({
      useFactory: (redisClient: Redis) => ({
        throttlers: [{ name: 'default', limit: 5, ttl: hours(1) }],
        storage: new ThrottlerStorageRedisService(redisClient),
      }),
      inject: [REDIS_CLIENT]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(loggerConfig),
    DrizzleModule,
    AuthModule,
    CustomersModule,
    RestaurantsModule,
    UserModule,
    AdminModule,
    OrderModule,
    DeliveryModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
