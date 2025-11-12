import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import {
  CreateUserRequestDto,
  UserListResponseDto,
  UserResponseDto,
} from './user.dto';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';

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

  async getById(id: number): Promise<UserResponseDto> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      throw new NotFoundException('No user with that id exist');
    }
    return user;
  }

  async create(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    const passwordHash = 'PLACEHOLDER_HASH';
    const [newUser] = await this.db
      .insert(users)
      .values({
        name: dto.name,
        email: dto.email,
        birthdate: dto.birthdate,
        passwordHash: passwordHash,
        isAdmin: false,
        dateJoined: new Date(),
      })
      .$returningId();

    if (!newUser || !newUser.id) {
      throw new Error('User creation failed to return ID');
    }

    return this.getById(newUser.id);
  }
}
