import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { seedTeams, clearTeams, TEAMS_SEED } from './seeds/teams';
import request from 'supertest';
import { clearUsers, seedUsers } from './seeds/users';
import { loadEnvFile } from 'process';
import { login, loginAdmin } from './helpers/login';

describe('Teams', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;
  let adminToken: string;

  const url = '/api/teams';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTeams(drizzle);
    await seedUsers(app, drizzle);

    userAuthToken = await login(app);
    adminToken = await loginAdmin(app);
  });

  describe('Teams', () => {
    describe('GET /api/teams', () => {
      it('should 200 and return all teams', async () => {
        const response = await request(app.getHttpServer())
          .get(url)
          .auth(userAuthToken, { type: 'bearer' });

        expect(response.statusCode).toBe(200);

        expect(response.body.teams).toEqual(expect.arrayContaining(TEAMS_SEED));
      });
    });
  });

  afterAll(async () => {
    await clearTeams(drizzle);
    await clearUsers(drizzle);

    await app.close();
  });
});
