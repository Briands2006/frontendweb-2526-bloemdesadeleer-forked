import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import request from 'supertest';
import { NEWS_SEED, seedNews, clearNews } from './seeds/news';
import { seedTracks, clearTracks } from './seeds/tracks';
import { clearUsers, seedUsers } from './seeds/users';
import { login } from './helpers/login';

describe('News', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/news';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTracks(drizzle);
    await seedUsers(app, drizzle);
    await seedNews(drizzle);

    userAuthToken = await login(app);
  });

  describe('News', () => {
    describe('GET /api/news', () => {
      it('should 200 and return all articles', async () => {
        const response = await request(app.getHttpServer())
          .get(url)
          .auth(userAuthToken, { type: 'bearer' });

        expect(response.statusCode).toBe(200);

        const expectedNewsJSON = JSON.parse(JSON.stringify(NEWS_SEED));

        expect(response.body.news).toEqual(
          expect.arrayContaining(expectedNewsJSON),
        );
      });
      describe('GET /api/places', () => {
        it('should 200 and return all places', () => {
          const expectedNewsJSON = JSON.parse(JSON.stringify(NEWS_SEED));

          return request(app.getHttpServer())
            .get(url)
            .auth(userAuthToken, { type: 'bearer' })
            .expect(200)
            .expect({ news: expectedNewsJSON });
        });
      });
    });
  });

  afterAll(async () => {
    await clearNews(drizzle);
    await clearTracks(drizzle);
    await clearUsers(drizzle);

    await app.close();
  });
});
