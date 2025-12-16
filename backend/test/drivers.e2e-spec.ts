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
  // let adminToken: string;

  const url = '/api/drivers';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTeams(drizzle);
    await seedDrivers(drizzle);
    await seedUsers(app, drizzle);

    userAuthToken = await login(app);
    // adminToken = await loginAdmin(app);
  });

  describe('Drivers', () => {
    describe('GET /api/drivers', () => {
      it('should 200 and return all drivers', async () => {
        const response = await request(app.getHttpServer())
          .get(url)
          .auth(userAuthToken, { type: 'bearer' });

        expect(response.statusCode).toBe(200);

        const receivedDrivers = response.body.drivers.map((driver: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { team, ...restOfDriver } = driver;
          return restOfDriver;
        });

        expect(receivedDrivers).toEqual(expect.arrayContaining(DRIVERS_SEED));
      });

      testAuthHeader(() => request(app.getHttpServer()).get(url));
    });
    // describe('GET /api/drivers', () => {
    //   it('should 200 and return all drivers', () => {
    //     return request(app.getHttpServer())
    //       .get(url)
    //       .auth(userAuthToken, { type: 'bearer' })
    //       .expect(200)
    //       .expect({ items: DRIVERS_SEED });
    //   });

    //   testAuthHeader(() => request(app.getHttpServer()).get(url));
    // });
  });

  afterAll(async () => {
    await clearDrivers(drizzle);
    await clearTeams(drizzle);
    await clearUsers(drizzle);

    await app.close();
  });
});
