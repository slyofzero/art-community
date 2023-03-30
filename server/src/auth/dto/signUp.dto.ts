import {
  IsNotEmpty,
  IsEmail,
  IsAlpha,
  IsDateString,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class SignUpDto {
  // ---------- Username ----------
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  // ---------- User verification ----------
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  // ---------- Personal Details ----------
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsOptional()
  @IsAlpha()
  middleName?: string;

  @IsOptional()
  @IsAlpha()
  lastName?: string;

  @IsNotEmpty()
  @IsDateString()
  DOB: string;

  @IsOptional()
  bio: string;
}
