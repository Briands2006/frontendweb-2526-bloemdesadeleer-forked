import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamListResponseDto, TeamResponseDto } from './teams.dto';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get()
  async getAllTeams(): Promise<TeamListResponseDto> {
    return this.teamService.getAll();
  }

  @Get(':id')
  async getTeamById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TeamResponseDto> {
    return this.teamService.getById(id);
  }

  @Get('n/:slug')
  async getTeamBySlug(@Param('slug') slug: string): Promise<TeamResponseDto> {
    return this.teamService.getBySlug(slug);
  }
}
