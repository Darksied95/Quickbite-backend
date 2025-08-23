import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { UserModule } from './modules/users/users.module';
import { DatabaseModule } from './database/knex.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule, AuthModule, CustomersModule, RestaurantsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
