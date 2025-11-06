import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { TrackListResponseDto, TrackResponseDto } from './tracks.dto';
import { eq } from 'drizzle-orm';
import { tracks } from '../drizzle/schema';

@Injectable()
export class TracksService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<TrackListResponseDto> {
    const tracks = await this.db.query.tracks.findMany();
    return { tracks };
  }

  async getById(id: number): Promise<TrackResponseDto> {
    const track = await this.db.query.tracks.findFirst({
      where: eq(tracks.id, id),
    });
    if (!track) {
      throw new NotFoundException('No track with that id exist');
    }
    return track;
  }

  async getBySlug(slug: string): Promise<TrackResponseDto> {
    const track = await this.db.query.tracks.findFirst({
      where: eq(tracks.slug, slug),
    });
    if (!track) {
      throw new NotFoundException('No track with this slug exists');
    }
    return track;
  }
}
