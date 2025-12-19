import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseCheck } from '../src/health/database.check';

describe('Health Controller (E2E)', () => {
  let app: INestApplication;
  const mockDatabaseCheck = {
    checkDatabaseStatus: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseCheck)
      .useValue(mockDatabaseCheck)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/health/ping', () => {
    it('should return pong (Public access)', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/health/ping',
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ pong: true });
    });
  });

  describe('GET /api/health/liveness', () => {
    it('should return liveness status', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/health/liveness')
        .set('Authorization', 'Bearer MOCK_TOKEN');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('UP');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/health/readiness', () => {
    const url = '/api/health/readiness';

    it('should return UP when database is connected', async () => {
      mockDatabaseCheck.checkDatabaseStatus.mockResolvedValue({
        database: 'UP',
      });

      const response = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', 'Bearer MOCK_TOKEN');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('UP');
      expect(response.body.message).toContain('Service is ready');
    });

    it('should return DOWN when database connection fails', async () => {
      mockDatabaseCheck.checkDatabaseStatus.mockResolvedValue({
        database: 'DOWN',
        error: 'Connection timeout',
      });

      const response = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', 'Bearer MOCK_TOKEN');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('DOWN');
      expect(response.body.message).toContain('connection failed');
    });
  });
});
