import { IsNotEmpty, IsString } from 'class-validator';
export class LogUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
