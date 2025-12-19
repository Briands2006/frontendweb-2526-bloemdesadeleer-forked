import { INestApplication, HttpStatus } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { seedTracks, clearTracks } from './seeds/tracks';
import { seedRaces, clearRaces } from './seeds/races';
import request from 'supertest';
import { clearUsers, seedUsers } from './seeds/users';
import { seedCalendar, clearCalendar } from './seeds/calendar';

describe('Calendar (e2e)', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;

  const url = '/api/calendar';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTracks(drizzle);
    await seedCalendar(drizzle);
    await seedRaces(drizzle);
    await seedUsers(app, drizzle);
  });

  describe('GET /api/calendar', () => {
    it('should 200 and return all calendar events (Public access)', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .expect(HttpStatus.OK);

      expect(response.body).toBeDefined();
      if (response.body.races) {
        expect(Array.isArray(response.body.races)).toBe(true);
      }
    });
  });

  describe('GET /api/calendar/:year', () => {
    it('should 200 and return the calendar for 2025', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/2025`)
        .expect(HttpStatus.OK);

      expect(response.body).toBeDefined();
    });

    it('should 400 when year is not a valid number (ParseIntPipe)', async () => {
      await request(app.getHttpServer())
        .get(`${url}/not-a-year`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should 200 and return empty list or 404 for a year without races', async () => {
      const response = await request(app.getHttpServer()).get(`${url}/1900`);

      expect([HttpStatus.OK, HttpStatus.NOT_FOUND]).toContain(
        response.statusCode,
      );
    });
  });

  afterAll(async () => {
    await clearRaces(drizzle);
    await clearCalendar(drizzle);
    await clearTracks(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });
});
