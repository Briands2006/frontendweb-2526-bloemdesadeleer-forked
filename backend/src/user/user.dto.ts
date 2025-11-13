import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxDate,
  MaxLength,
  Min,
  MinLength,
  IsDateString,
} from 'class-validator';

export class PublicUserResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(), { message: 'Date must not be in the future' })
  birthdate: Date;

  @IsDate()
  dateJoined: Date;

  @IsBoolean()
  isAdmin: boolean;
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

  @IsDateString()
  birthdate: string;
}
