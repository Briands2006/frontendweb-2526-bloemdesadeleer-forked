import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class FastestLapDto {
  time: string;
  @IsString()
  driver: string;
  @IsNumber()
  year: number;
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
  @IsNumber()
  length_km: number;
  @IsInt()
  laps: number;
  fastest_lap: FastestLapDto;
  slug: string;
}

export class TrackListResponseDto {
  tracks: TrackResponseDto[];
}
