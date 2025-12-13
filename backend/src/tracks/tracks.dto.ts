import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FastestLapDto {
  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  driver?: string;

  @IsOptional()
  @IsInt()
  year?: number;
}

export class TrackResponseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @IsString()
  lengthKm: string;

  @IsInt()
  laps: number;

  @IsOptional()
  fastestLapTime?: string | null;

  @IsOptional()
  fastestLapDriver?: string | null;

  @IsOptional()
  fastestLapYear?: number | null;

  @IsString()
  slug: string;
}

export class TrackListResponseDto {
  @ApiProperty({ type: () => [TrackResponseDto] })
  tracks: TrackResponseDto[];
}
