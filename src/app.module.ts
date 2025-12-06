import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RestaurantsModule } from './modules/restaurants/restaurant.module';
import { UserModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './common/config/logger.config';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './exceptions/domain-exception.filter';
import { DrizzleModule } from './database/drizzle.module';
import { OrderModule } from './modules/orders/order.module';
import { DeliveryModule } from './modules/deliveries/delivery.module';

@Module({
  imports: [
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
    DeliveryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter
    }
  ],
})
export class AppModule { }
