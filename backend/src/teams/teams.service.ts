import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { TeamListResponseDto, TeamResponseDto } from './teams.dto';
import { eq } from 'drizzle-orm';
import { teams } from '../drizzle/schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<TeamListResponseDto> {
    const teamsData = await this.db.query.teams.findMany({
      with: {
        drivers: true,
      },
    });
    return { teams: teamsData };
  }

  async getById(id: number): Promise<TeamResponseDto> {
    const team = await this.db.query.teams.findFirst({
      where: eq(teams.id, id),
    });
    if (!team) {
      throw new NotFoundException('No team with that id exist');
    }
    return team;
  }

  async getBySlug(slug: string): Promise<TeamResponseDto> {
    const team = await this.db.query.teams.findFirst({
      where: eq(teams.slug, slug),
    });
    if (!team) {
      throw new NotFoundException('No team with this slug exists');
    }
    return team;
  }
}
