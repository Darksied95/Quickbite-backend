import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';

export class CreateDriverDTO extends CreateUserDTO {
  @ApiProperty({ example: 'DL123456789' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ enum: ['motorcycle', 'car', 'bicycle'] })
  @IsIn(['motorcycle', 'car', 'bicycle'])
  vehicleType: 'motorcycle' | 'car' | 'bicycle';

  @ApiProperty({ example: 'ABC-123-XY' })
  @IsString()
  @IsNotEmpty()
  vehiclePlateNumber: string;
}
