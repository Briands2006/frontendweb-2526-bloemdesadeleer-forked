import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RacesService } from './races.service';
import { Public } from '../auth/decorators/public.decorator';
import { RaceListResponseDto, RaceResponseDto } from './race.dto';

@Controller('races')
export class RacesController {
  constructor(private raceService: RacesService) {}

  @Get()
  @Public()
  async getAllRaces(): Promise<RaceListResponseDto> {
    return this.raceService.getAll();
  }

  @Get(':id')
  async getRaceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RaceResponseDto> {
    return this.raceService.getById(id);
  }

  @Get('n/:slug')
  @Public()
  async getDriverBySlug(@Param('slug') slug: string): Promise<RaceResponseDto> {
    return this.raceService.getBySlug(slug);
  }
}
