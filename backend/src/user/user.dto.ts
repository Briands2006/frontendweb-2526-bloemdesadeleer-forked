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
  IsOptional,
} from 'class-validator';

// Voeg deze klassen toe in uw bestand (bijvoorbeeld boven PublicUserResponseDto)

// 1. DTO voor de Coureur (Driver) Details
class DriverDetailsDto {
  @Expose()
  id: number;

  // DEZE IS CRUCIAAL: De front-end gebruikt 'item.driver.name'
  @Expose()
  name: string;

  @Expose()
  photo: string;
}

// 2. DTO voor de Track (Circuit) Details
class TrackDetailsDto {
  @Expose()
  id: number;

  // DEZE IS CRUCIAAL: De front-end gebruikt 'item.track.name'
  @Expose()
  name: string;

  @Expose()
  location: string;
}

// 3. DTO voor de PIVOT TABEL (FavoriteDriver)
// Dit is het object dat in de 'favoriteDrivers' array zit
class FavoriteDriverDto {
  @Expose()
  id: number; // Optioneel, als u de ID van de pivot-rij nodig heeft

  @Expose()
  @Type(() => DriverDetailsDto) // Vertelt class-transformer dat dit een genest object is
  driver: DriverDetailsDto;
}

// 4. DTO voor de PIVOT TABEL (FavoriteTrack)
// Dit is het object dat in de 'favoriteTracks' array zit
class FavoriteTrackDto {
  @Expose()
  id: number; // Optioneel

  @Expose()
  @Type(() => TrackDetailsDto)
  track: TrackDetailsDto;
}

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

  // -------------------------------------------------------------------
  // NIEUW: Favoriete Coureurs
  // -------------------------------------------------------------------
  @Expose()
  @Type(() => FavoriteDriverDto) // Vertelt class-transformer dat het een array van FavoriteDriverDto's is
  favoriteDrivers: FavoriteDriverDto[];

  // -------------------------------------------------------------------
  // NIEUW: Favoriete Circuits
  // -------------------------------------------------------------------
  @Expose()
  @Type(() => FavoriteTrackDto) // Vertelt class-transformer dat het een array van FavoriteTrackDto's is
  favoriteTracks: FavoriteTrackDto[];
}

export class UserListResponseDto {
  users: PublicUserResponseDto[];
}

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  @IsDateString()
  birthdate: string;
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
