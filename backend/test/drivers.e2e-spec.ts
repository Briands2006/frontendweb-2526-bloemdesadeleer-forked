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

describe('Drivers (Extended)', () => {
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
    it('should return drivers including their team object', async () => {
      const response = await request(app.getHttpServer()).get(url);

      expect(response.statusCode).toBe(200);
      expect(response.body.drivers.length).toBeGreaterThan(0);

      // Controleer of de eerste driver een team object heeft (door de 'with' clause in de service)
      const firstDriver = response.body.drivers[0];
      expect(firstDriver).toHaveProperty('team');
      expect(firstDriver.team).toHaveProperty('name');
    });
  });

  describe('GET /api/drivers/:id', () => {
    it('should 200 and return driver when calling a valid numeric ID', async () => {
      // We gaan ervan uit dat ID 1 bestaat na het seeden
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should 400 Bad Request when ID is not a number (ParseIntPipe)', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/niet-een-getal`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });

    it('should 404 when driver ID does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/9999`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('No driver with that id exist');
    });
  });

  describe('GET /api/drivers/n/:slug', () => {
    it('should return the correct driver for a specific slug', async () => {
      const targetDriver = DRIVERS_SEED[0];
      const response = await request(app.getHttpServer()).get(
        `${url}/n/${targetDriver.slug}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.slug).toBe(targetDriver.slug);
      expect(response.body.name).toBe(targetDriver.name);
    });

    it('should be case sensitive or handle special characters according to slug rules', async () => {
      // Testen of een slug met hoofdletters (indien niet ondersteund) een 404 geeft
      const response = await request(app.getHttpServer()).get(
        `${url}/n/NIET-BESTAAND-SLUG`,
      );

      expect(response.statusCode).toBe(404);
    });
  });

  afterAll(async () => {
    await clearDrivers(drizzle);
    await clearTeams(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });
});
