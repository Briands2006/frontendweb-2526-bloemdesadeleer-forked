import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { DRIVERS_SEED, seedDrivers, clearDrivers } from './seeds/drivers';
import { seedTeams, clearTeams } from './seeds/teams';
import request from 'supertest';
import { login } from './helpers/login';
import { clearUsers, seedUsers } from './seeds/users';
import testAuthHeader from './helpers/testAuthHeader';

describe('Drivers', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/drivers';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTeams(drizzle);
    await seedDrivers(drizzle);
    await seedUsers(app, drizzle);

    userAuthToken = await login(app);
  });

  describe('GET /api/drivers', () => {
    it('should 200 and return all drivers', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);

      const receivedDrivers = response.body.drivers.map((driver: any) => {
        const { team, ...restOfDriver } = driver;
        return restOfDriver;
      });

      expect(receivedDrivers).toEqual(expect.arrayContaining(DRIVERS_SEED));
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/drivers/n/:slug', () => {
    it('should 200 and return the specific driver by slug', async () => {
      const targetDriver = DRIVERS_SEED[0]; // Max Verstappen
      const response = await request(app.getHttpServer())
        .get(`${url}/n/${targetDriver.slug}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
    });

    it('should 404 if the driver slug does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/n/non-existing-slug`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).get(`${url}/n/max-verstappen`),
    );
  });

  afterAll(async () => {
    await clearDrivers(drizzle);
    await clearTeams(drizzle);
    await clearUsers(drizzle);

    await app.close();
  });
});
