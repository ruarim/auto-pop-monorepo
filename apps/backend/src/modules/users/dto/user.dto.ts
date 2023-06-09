import { IsEmail, IsNumber, IsString } from 'class-validator';
import { RefreshIntervals } from '../entities/user.entity';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  depopToken?: string;

  @IsNumber()
  depopId?: number;

  @IsNumber()
  schedule?: RefreshIntervals;
}
