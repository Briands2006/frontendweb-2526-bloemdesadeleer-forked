import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackResponseDto, TrackListResponseDto } from './tracks.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TracksService) {}

  @Get()
  @Public()
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
  @Public()
  async getTrackBySlug(@Param('slug') slug: string): Promise<TrackResponseDto> {
    return this.trackService.getBySlug(slug);
  }
}
