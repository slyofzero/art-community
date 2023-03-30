import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignInDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  password: string;
}

export interface UserCredI {
  username?: String;
  email?: String;
  phoneNumber?: String;
}
