import { IsString } from 'class-validator';

export class SetDepopTokenDto {
  @IsString()
  token: string;
}
