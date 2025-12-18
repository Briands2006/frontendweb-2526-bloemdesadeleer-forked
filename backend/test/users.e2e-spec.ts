import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { AdminGuard } from '../src/auth/guards/admin.guard';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const userService = {
    getById: jest.fn(),
    getAll: jest.fn(),
    updateById: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthGuard, useValue: {} }, // Mock AuthService
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Skip auth voor test
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (GET) - Admin krijgt alle gebruikers', () => {
    userService.getAll.mockResolvedValue({ users: [] });
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({ users: [] });
  });

  it('/users/me/favorites/driver (PATCH) - Validatie check', () => {
    // Test of class-validator werkt (itemId moet een nummer zijn)
    return request(app.getHttpServer())
      .patch('/users/me/favorites/driver')
      .send({ itemId: 'geen-nummer' })
      .expect(400); // Bad Request door ValidationPipe
  });

  it('/users/:id (GET) - Haalt specifieke user op', () => {
    userService.getById.mockResolvedValue({ id: 2, name: 'Fan' });
    return request(app.getHttpServer())
      .get('/users/2')
      .expect(200)
      .expect({ id: 2, name: 'Fan' });
  });

  afterAll(async () => {
    await app.close();
  });
});
