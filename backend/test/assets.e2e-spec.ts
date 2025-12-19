import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import request from 'supertest';

describe('Assets (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  describe('Public Folder Access', () => {
    it('should be able to access team logos', async () => {
      await request(app.getHttpServer())
        .get('/assets/teamLogos/redbull.png')
        .expect(HttpStatus.OK);
    });

    it('should be able to access driver photos', async () => {
      await request(app.getHttpServer())
        .get('/assets/driverHeadshots/max-verstappen.jpg')
        .expect(HttpStatus.OK);
    });

    it('should return 404 for non-existing assets', async () => {
      await request(app.getHttpServer())
        .get('/assets/non-existing-file.png')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
