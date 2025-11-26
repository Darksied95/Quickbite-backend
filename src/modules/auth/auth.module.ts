import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingService } from './hashing.service';
import { UserModule } from '../users/users.module';
import { AddressModule } from '../addresses/addresses.module';
import { CustomersModule } from '../customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token/token.service';
import { TokenRepository } from './token/token.repository';
import { ConfigService } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { RestaurantsModule } from '../restaurants/restaurant.module';
import { DriverModule } from '../drivers/driver.module';

@Module({
  imports: [
    UserModule,
    AddressModule,
    CustomersModule,
    AdminModule,
    DriverModule,
    RestaurantsModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET')
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN')

        if (!secret || !expiresIn) {
          throw new Error('JWT environment variables are required')
        }

        return {
          secret,
          signOptions: { expiresIn }
        }

      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashingService,
    TokenService,
    TokenRepository
  ],
})
export class AuthModule { }
