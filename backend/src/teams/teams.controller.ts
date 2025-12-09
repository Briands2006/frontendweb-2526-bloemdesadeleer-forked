import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamListResponseDto, TeamResponseDto } from './teams.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get()
  @Public()
  async getAllTeams(): Promise<TeamListResponseDto> {
    return this.teamService.getAll();
  }

  @Get(':id')
  @Public()
  async getTeamById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TeamResponseDto> {
    return this.teamService.getById(id);
  }

  @Get('n/:slug')
  @Public()
  async getTeamBySlug(@Param('slug') slug: string): Promise<TeamResponseDto> {
    return this.teamService.getBySlug(slug);
  }
}
