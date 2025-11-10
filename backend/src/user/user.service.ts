import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { UserListResponseDto, UserResponseDto } from './user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<UserListResponseDto> {
    const users = await this.db.query.users.findMany();
    return { users };
  }

  async getById(id: number): Promise<TrackResponseDto> {
    const track = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!track) {
      throw new NotFoundException('No track with that id exist');
    }
    return track;
  }

  async getBySlug(slug: string): Promise<UserResponseDto> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.slug, slug),
    });
    if (!user) {
      throw new NotFoundException('No track with this slug exists');
    }
    return user;
  }
}
