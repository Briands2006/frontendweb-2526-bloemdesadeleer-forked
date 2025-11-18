import { Expose, Type } from 'class-transformer';
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
  @Expose()
  @IsInt()
  @Min(1)
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(), { message: 'Date must not be in the future' })
  birthdate: Date;

  @Expose()
  @IsDate()
  dateJoined: Date;

  @Expose()
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
