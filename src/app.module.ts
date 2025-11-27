import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RestaurantsModule } from './modules/restaurants/restaurant.module';
import { UserModule } from './modules/users/users.module';
import { DatabaseModule } from './database/knex.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './common/config/logger.config';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './exceptions/domain-exception.filter';
import { TypeOrmDBModule } from './database/typeorm.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(loggerConfig),
    DatabaseModule,
    TypeOrmDBModule,
    AuthModule,
    CustomersModule,
    RestaurantsModule,
    UserModule,
    AdminModule,
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
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
