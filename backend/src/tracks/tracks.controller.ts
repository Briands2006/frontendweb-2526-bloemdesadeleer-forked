import { Controller, Get, Param } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResponseDto, TrackListResponseDto } from './track.dto';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<TrackListResponseDto> {
    return this.trackService.getAll();
  }

  @Get(':slug')
  async getTrackBySlug(@Param('slug') slug: string): Promise<TrackResponseDto> {
    return this.trackService.getBySlug(slug);
  }
}
