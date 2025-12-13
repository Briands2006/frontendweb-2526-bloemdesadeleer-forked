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
import { login, loginAdmin } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeader';

describe('News', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;
  let adminToken: string;

  const url = '/api/news';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedTracks(drizzle);
    await seedUsers(app, drizzle);
    await seedNews(drizzle);

    userAuthToken = await login(app);
    adminToken = await loginAdmin(app);
  });

  describe('News', () => {
    describe('GET /api/news', () => {
      it('should 200 and return all articles', async () => {
        const response = await request(app.getHttpServer())
          .get(url)
          .auth(userAuthToken, { type: 'bearer' });

        expect(response.statusCode).toBe(200);

        const expectedNews = NEWS_SEED.map((news: any) => ({
          ...news,
          // Converteer het Date object naar een ISO string
          date: news.date.toISOString(),
        }));

        expect(response.body.news).toEqual(
          expect.arrayContaining(expectedNews),
        );
      });
      describe('GET /api/places', () => {
        it('should 200 and return all places', () => {
          return request(app.getHttpServer())
            .get(url)
            .auth(userAuthToken, { type: 'bearer' })
            .expect(200)
            .expect({ news: NEWS_SEED });
        });

        testAuthHeader(() => request(app.getHttpServer()).get(url));
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
