import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class UserResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  birthdate: Date;

  // moeten volgens mij geen checks op komen aangezien dit geen user input is
  dateJoined: Date;
  isAdmin: boolean;
}

export class UserListResponseDto {
  users: UserResponseDto[];
}
