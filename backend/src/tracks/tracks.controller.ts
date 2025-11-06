import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackResponseDto, TrackListResponseDto } from './tracks.dto';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<TrackListResponseDto> {
    return this.trackService.getAll();
  }

  @Get(':id')
  async getTrackById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TrackResponseDto> {
    return this.trackService.getById(id);
  }

  @Get('n/:slug')
  async getTrackBySlug(@Param('slug') slug: string): Promise<TrackResponseDto> {
    return this.trackService.getBySlug(slug);
  }
}
