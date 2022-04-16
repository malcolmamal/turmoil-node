import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
