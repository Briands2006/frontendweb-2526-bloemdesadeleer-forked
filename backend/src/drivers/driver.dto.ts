import {
  IsInt,
  IsString,
  IsNotEmpty,
  Min,
  IsISO31661Alpha2,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DriverResponseDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1, description: 'ID of the driver' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Max Verstappen', description: 'Name of the driver' })
  name: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1, description: 'Number of the driver' })
  number: number;

  @IsString()
  @IsISO31661Alpha2() // class-validator heeft dus een check of dat dit een 2 letterige country code is
  @ApiProperty({
    example: 'NL',
    description: 'Country-code of the driver in ISO31661Alpha2 notation',
  })
  country: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'max-verstappen',
    description: 'Slug of the drivers name',
  })
  slug: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1, description: 'ID of the team of the driver' })
  teamId: number;
}

export class DriverListResponseDto {
  @ApiProperty({ type: () => [DriverResponseDto] })
  drivers: DriverResponseDto[];
}
