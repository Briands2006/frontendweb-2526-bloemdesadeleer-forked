export class FastestLapDto {
  time: string;
  driver: string;
  year: number;
}

export class TrackResponseDto {
  name: string;
  location: string;
  length_km: number;
  laps: number;
  fastest_lap: FastestLapDto;
  slug: string;
}

export class TrackListResponseDto {
  tracks: TrackResponseDto[];
}
