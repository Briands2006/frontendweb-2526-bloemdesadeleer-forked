import { INestApplication, HttpStatus } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { seedTracks, clearTracks } from './seeds/tracks';
import { seedRaces, clearRaces, RACES_SEED } from './seeds/races';
import request from 'supertest';
import { clearUsers, seedUsers } from './seeds/users';
import { seedCalendar, clearCalendar } from './seeds/calendar';

describe('Races (e2e)', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;

  const url = '/api/races';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTracks(drizzle);
    await seedCalendar(drizzle);
    await seedRaces(drizzle);
    await seedUsers(app, drizzle);
  });

  describe('GET /api/races', () => {
    it('should 200 and return all races (Public access)', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .expect(HttpStatus.OK);

      expect(response.body.races).toBeDefined();
      expect(Array.isArray(response.body.races)).toBe(true);
      expect(response.body.races.length).toBeGreaterThan(0);
    });

    it('should include track information in the race list', async () => {
      const response = await request(app.getHttpServer()).get(url);

      const firstRace = response.body.races[0];
      expect(firstRace).toHaveProperty('track');
      expect(firstRace.track).toHaveProperty('name');
    });
  });

  describe('GET /api/races/:id', () => {
    it('should 200 and return a specific race (Public access)', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body.track).toHaveProperty(
        'name',
        'Bahrain International Circuit',
      );
    });

    it('should 400 when ID is not a number', async () => {
      await request(app.getHttpServer())
        .get(`${url}/abc`)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should 404 when race ID does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/9999`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toBe('No race with that id exist');
    });
  });

  describe('GET /api/races/n/:slug', () => {
    it('should 200 and return the race for a valid slug (Public access)', async () => {
      const targetRace = RACES_SEED[0];
      const response = await request(app.getHttpServer())
        .get(`${url}/n/${targetRace.slug}`)
        .expect(HttpStatus.OK);

      expect(response.body.slug).toBe(targetRace.slug);
    });

    it('should 404 for a non-existing race slug', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/n/grand-prix-of-mars`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toBe('No race with this slug exists');
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
