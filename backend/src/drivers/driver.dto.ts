import {
  IsInt,
  IsString,
  IsNotEmpty,
  Min,
  IsISO31661Alpha2,
} from 'class-validator';

export class DriverResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  number: number;

  @IsString()
  @IsISO31661Alpha2() // class-validator heeft dus een check of dat dit een 2 letterige country code is
  country: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsInt()
  @Min(1)
  teamId: number;
}

export class DriverListResponseDto {
  drivers: DriverResponseDto[];
}
