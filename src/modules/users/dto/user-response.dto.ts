import { Expose } from 'class-transformer';
import { CreateUserDTO } from './create-user.dto';

export class UserResponseDto implements Omit<CreateUserDTO, 'password'> {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  phone: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
