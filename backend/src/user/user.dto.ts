import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class PublicUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;
}

export class UserListResponseDto {
  users: PublicUserResponseDto[];
}

export class UpdateUserRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}

export class RegisterUserRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsDate()
  birthdate: string;
}
