import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';

@Module({
  imports: [AuthModule, CustomersModule, RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
