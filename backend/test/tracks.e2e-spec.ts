import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { seedTracks, clearTracks } from '../test/seeds/tracks';
import { DatabaseProvider } from '../src/drizzle/drizzle.provider';

describe('Tracsks', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    drizzle = app.get<DatabaseProvider>('DrizzleAsyncProvider');

    // Database klaarzetten
    await clearTracks(drizzle);
    await seedTracks(drizzle);
  });

  it('/tracks (GET) - Should match seed count', async () => {
    const response = await request(app.getHttpServer())
      .get('/tracks')
      .expect(200);

    expect(response.body.tracks.length).toBe(24);
  });

  it('/tracks/n/:slug (GET) - Should return Zandvoort details', async () => {
    const response = await request(app.getHttpServer())
      .get('/tracks/n/circuit-zandvoort')
      .expect(200);

    expect(response.body.location).toBe('Zandvoort, Netherlands');
    expect(response.body.fastestLapYear).toBe(2021);
  });

  afterAll(async () => {
    await clearTracks(drizzle);
    await app.close();
  });
});
