import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { UserController } from './users.controller';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
