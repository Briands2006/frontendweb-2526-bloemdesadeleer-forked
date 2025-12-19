import { INestApplication, HttpStatus } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { seedTeams, clearTeams, TEAMS_SEED } from './seeds/teams';
import { seedDrivers, clearDrivers } from './seeds/drivers';
import request from 'supertest';
import { clearUsers, seedUsers } from './seeds/users';

describe('Teams', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;

  const url = '/api/teams';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTeams(drizzle);
    await seedDrivers(drizzle);
    await seedUsers(app, drizzle);
  });

  describe('GET /api/teams', () => {
    it('should 200 and return all teams without authentication', async () => {
      const response = await request(app.getHttpServer()).get(url);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body.teams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: TEAMS_SEED[0].name }),
        ]),
      );
    });

    it('should include drivers in the team objects', async () => {
      const response = await request(app.getHttpServer()).get(url);
      const firstTeam = response.body.teams[0];
      expect(firstTeam).toHaveProperty('drivers');
      expect(Array.isArray(firstTeam.drivers)).toBe(true);
    });
  });

  describe('GET /api/teams/:id', () => {
    it('should 200 and return a team by numeric ID', async () => {
      const response = await request(app.getHttpServer()).get(`${url}/1`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should 400 when ID is not a number (ParseIntPipe)', async () => {
      const response = await request(app.getHttpServer()).get(`${url}/abc`);

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should 404 when team ID does not exist', async () => {
      const response = await request(app.getHttpServer()).get(`${url}/9999`);

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/teams/n/:slug', () => {
    it('should 200 and return the correct team by slug', async () => {
      const targetTeam = TEAMS_SEED[0];
      const response = await request(app.getHttpServer()).get(
        `${url}/n/${targetTeam.slug}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body.slug).toBe(targetTeam.slug);
      expect(response.body.name).toBe(targetTeam.name);
    });

    it('should 404 for a non-existing slug', async () => {
      const response = await request(app.getHttpServer()).get(
        `${url}/n/non-existing-team-slug`,
      );

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await clearDrivers(drizzle);
    await clearTeams(drizzle);
    await clearUsers(drizzle);

    await app.close();
  });
});
