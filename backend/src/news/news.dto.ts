import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxDate,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class NewsResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  summary: string;

  @IsString()
  fullContent: string;

  @IsString()
  @IsOptional()
  imageUrl: string | null;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(), { message: 'Date must not be in the future' })
  date: Date;

  @IsString()
  @IsOptional()
  tags: string | null;

  @IsOptional()
  @IsInt()
  authorId: number | null;

  @IsOptional()
  @IsInt()
  trackId: number | null;
}

export class NewsListResponseDto {
  news: NewsResponseDto[];
}
