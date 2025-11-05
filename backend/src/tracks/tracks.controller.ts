import { Controller, Get, Param } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackResponseDto, TrackListResponseDto } from './tracks.dto';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<TrackListResponseDto> {
    return this.trackService.getAll();
  }

  @Get(':slug')
  async getTrackBySlug(@Param('slug') slug: string): Promise<TrackResponseDto> {
    return this.trackService.getBySlug(slug);
  }
}
