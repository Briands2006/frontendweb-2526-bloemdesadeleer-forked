import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { RaceListResponseDto, RaceResponseDto } from './race.dto';
import { races } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RacesService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<RaceListResponseDto> {
    const races = await this.db.query.races.findMany();
    return { races };
  }

  async getById(id: number): Promise<RaceResponseDto> {
    const race = await this.db.query.races.findFirst({
      where: eq(races.id, id),
      with: {
        track: true,
      },
    });
    if (!race) {
      throw new NotFoundException('No race with that id exist');
    }
    return race;
  }

  async getBySlug(slug: string): Promise<RaceResponseDto> {
    const race = await this.db.query.races.findFirst({
      where: eq(races.slug, slug),
      with: {
        track: true,
      },
    });
    if (!race) {
      throw new NotFoundException('No track with this slug exists');
    }
    return race;
  }
}
