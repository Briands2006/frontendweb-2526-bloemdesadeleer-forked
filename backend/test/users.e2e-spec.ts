import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import request from 'supertest';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { AuthService } from '../src/auth/auth.service';
import { AdminGuard } from '../src/auth/guards/admin.guard';
import { CheckUserAccessGuard } from '../src/auth/guards/userAccess.guard';
import { ConfigService } from '@nestjs/config';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockToken = 'any-string-will-do-since-we-override-the-guard';

  const userService = {
    getById: jest.fn(),
    getAll: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
    toggleFavoriteDriver: jest.fn(),
    toggleFavoriteTrack: jest.fn(),
  };

  const authService = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('secret') },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { id: 1, role: 'user' };
          return true;
        },
      })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(CheckUserAccessGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('Registration', () => {
    it('/api/users (POST) - Success', () => {
      authService.register.mockResolvedValue('mock-jwt-token');
      return request(app.getHttpServer())
        .post('/api/users')
        .send({
          email: 'test@test.com',
          password: 'Password123!',
          name: 'Test',
          birthdate: '1990-01-01',
        })
        .expect(HttpStatus.CREATED)
        .expect({ token: 'mock-jwt-token' });
    });

    it('/api/users (POST) - Validation Failure', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send({
          email: 'invalid-email',
          password: '',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Favorites', () => {
    it('/api/users/me/favorites/driver (PATCH)', () => {
      userService.toggleFavoriteDriver.mockResolvedValue({
        id: 1,
        favorites: [10],
      });
      return request(app.getHttpServer())
        .patch('/api/users/me/favorites/driver')
        .send({ itemId: 10 })
        .expect(HttpStatus.OK);
    });

    it('/api/users/me/favorites/track (PATCH)', () => {
      userService.toggleFavoriteTrack.mockResolvedValue({
        id: 1,
        favoriteTracks: [5],
      });
      return request(app.getHttpServer())
        .patch('/api/users/me/favorites/track')
        .send({ itemId: 5 })
        .expect(HttpStatus.OK);
    });

    it('/api/users/me/favorites/driver (PATCH) - Bad Request', () => {
      return request(app.getHttpServer())
        .patch('/api/users/me/favorites/driver')
        .send({ itemId: 'abc' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('User Management', () => {
    it('/api/users (GET) - Admin Get All', () => {
      const mockUsers = [
        {
          id: 1,
          name: 'User 1',
        },
        {
          id: 2,
          name: 'User 2',
        },
      ];
      userService.getAll.mockResolvedValue({ users: mockUsers });
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(HttpStatus.OK)
        .expect({ users: mockUsers });
    });

    it('/api/users/:id (GET) - By ID', () => {
      userService.getById.mockResolvedValue({ id: 2, name: 'Fan' });
      return request(app.getHttpServer())
        .get('/api/users/2')
        .expect(HttpStatus.OK)
        .expect({ id: 2, name: 'Fan' });
    });

    it('/api/users/me (GET) - Shortcut', () => {
      userService.getById.mockResolvedValue({ id: 1, name: 'Current User' });
      return request(app.getHttpServer())
        .get('/api/users/me')
        .set('Authorization', `Bearer ${mockToken}`)
        .expect(HttpStatus.OK)
        .expect({ id: 1, name: 'Current User' });
    });

    it('/api/users/:id (PUT) - Full Update', () => {
      userService.updateById.mockResolvedValue({ id: 2, name: 'Updated Name' });
      return request(app.getHttpServer())
        .put('/api/users/2')
        .send({ name: 'Updated Name', email: 'new@email.com' })
        .expect(HttpStatus.OK);
    });

    it('/api/users/:id (PATCH) - Partial Update', () => {
      userService.updateById.mockResolvedValue({ id: 2, name: 'Patched Name' });
      return request(app.getHttpServer())
        .patch('/api/users/2')
        .send({ name: 'Patched Name' })
        .expect(HttpStatus.OK)
        .expect({ id: 2, name: 'Patched Name' });
    });

    it('/api/users/:id (DELETE)', () => {
      userService.deleteById.mockResolvedValue(undefined);
      return request(app.getHttpServer())
        .delete('/api/users/2')
        .expect(HttpStatus.NO_CONTENT);
    });
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});
