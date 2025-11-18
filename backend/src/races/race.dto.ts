import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class RaceResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  weather: string;

  @IsString()
  @IsOptional()
  trackRecord: string | null;

  @IsInt()
  @IsNotEmpty()
  trackId: number;

  @IsInt()
  @IsNotEmpty()
  calendarYear: number;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class RaceListResponseDto {
  races: RaceResponseDto[];
}
