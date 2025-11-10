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
  password: string;

  @IsString()
  @IsNotEmpty()
  birhtdate: Date;

  // moeten volgens mij geen checks op komen aangezien dit geen user input is
  dateJoined: Date;
  IsAdmin: boolean;
}

export class UserListResponseDto {
  users: UserResponseDto[];
}
