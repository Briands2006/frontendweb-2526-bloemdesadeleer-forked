import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import {
  UpdateUserRequestDto,
  PublicUserResponseDto,
  UserListResponseDto,
} from './user.dto';
import { eq, and } from 'drizzle-orm';
import { users, FavoriteDriver, FavoriteTrack } from '../drizzle/schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<UserListResponseDto> {
    const userList = await this.db.query.users.findMany();
    const users = userList.map((u) =>
      plainToInstance(PublicUserResponseDto, u, {
        excludeExtraneousValues: true,
      }),
    );
    return { users };
  }

  async getById(id: number): Promise<PublicUserResponseDto> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        favoriteDrivers: {
          with: {
            driver: true,
          },
        },
        favoriteTracks: {
          with: {
            track: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('No user with that id exist');
    }
    return plainToInstance(PublicUserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db.delete(users).where(eq(users.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No user with this id exists');
    }
  }

  async updateById(
    id: number,
    changes: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    const [result] = await this.db
      .update(users)
      .set(changes)
      .where(eq(users.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No user with this id exists');
    }

    return this.getById(id);
  }
  async toggleFavoriteDriver(
    userId: number,
    driverId: number,
  ): Promise<PublicUserResponseDto> {
    const favorite = await this.db.query.FavoriteDriver.findFirst({
      where: and(
        eq(FavoriteDriver.userId, userId),
        eq(FavoriteDriver.driverId, driverId),
      ),
    });

    if (favorite) {
      // Bestaat: Verwijderen
      await this.db
        .delete(FavoriteDriver)
        .where(
          and(
            eq(FavoriteDriver.userId, userId),
            eq(FavoriteDriver.driverId, driverId),
          ),
        );
      return this.getById(userId); // Verwijderd
    } else {
      // Bestaat niet: Toevoegen
      await this.db.insert(FavoriteDriver).values({
        userId,
        driverId,
      });
      return this.getById(userId); // Toegevoegd
    }
  }

  /**
   * Voegt een circuit toe aan of verwijdert deze van de favorieten van de gebruiker.
   * Retourneert de nieuwe status (toegevoegd: true, verwijderd: false)
   */
  async toggleFavoriteTrack(
    userId: number,
    trackId: number,
  ): Promise<PublicUserResponseDto> {
    const favorite = await this.db.query.FavoriteTrack.findFirst({
      where: and(
        eq(FavoriteTrack.userId, userId),
        eq(FavoriteTrack.trackId, trackId),
      ),
    });

    if (favorite) {
      // Bestaat: Verwijderen
      await this.db
        .delete(FavoriteTrack)
        .where(
          and(
            eq(FavoriteTrack.userId, userId),
            eq(FavoriteTrack.trackId, trackId),
          ),
        );
      return this.getById(userId); // Verwijderd
    } else {
      // Bestaat niet: Toevoegen
      await this.db.insert(FavoriteTrack).values({
        userId,
        trackId,
      });
      return this.getById(userId); // Toegevoegd
    }
  }
}
