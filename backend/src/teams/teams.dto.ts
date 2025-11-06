import { IsInt, IsString, IsNotEmpty, Min, IsHexColor } from 'class-validator';

export class TeamResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  base: string;

  @IsString()
  @IsNotEmpty()
  chief: string;

  @IsInt()
  @Min(0)
  championships: number;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  car: string;

  @IsString()
  @IsNotEmpty()
  info: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor() // class-validator heeft dus ook een isHexColor functie/check
  primaryColor: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class TeamListResponseDto {
  teams: TeamResponseDto[];
}
