import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { seedTracks, clearTracks } from './seeds/tracks';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { login } from './helpers/login';
import { clearUsers, seedUsers } from './seeds/users';

describe('Tracks (e2e)', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/tracks';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await clearTracks(drizzle);
    await seedTracks(drizzle);
    await seedUsers(app, drizzle);

    userAuthToken = await login(app);
  });

  describe('GET /api/tracks', () => {
    it('should 200 and return all tracks (Public)', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .expect(HttpStatus.OK);

      expect(response.body.tracks).toBeDefined();
      expect(Array.isArray(response.body.tracks)).toBe(true);
      expect(response.body.tracks.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/tracks/:id', () => {
    it('should 200 and return track by ID when authenticated', async () => {
      // We testen ID 1 (meestal Zandvoort of Spa in F1 seeds)
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .auth(userAuthToken, { type: 'bearer' })
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id', 1);
    });

    it('should 401 when calling ID route without token', async () => {
      await request(app.getHttpServer())
        .get(`${url}/1`)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should 400 when ID is not a number', async () => {
      await request(app.getHttpServer())
        .get(`${url}/invalid-id`)
        .auth(userAuthToken, { type: 'bearer' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/tracks/n/:slug', () => {
    it('should 200 and return Zandvoort details (Public)', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/n/circuit-zandvoort`)
        .expect(HttpStatus.OK);

      expect(response.body.location).toContain('Netherlands');
      expect(response.body.slug).toBe('circuit-zandvoort');
    });

    it('should 404 for a non-existing track slug', async () => {
      await request(app.getHttpServer())
        .get(`${url}/n/non-existing-track`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await clearTracks(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });
});
