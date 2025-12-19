// test/helpers/create-app.ts
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { AppModule } from '../../src/app.module';
import { HttpExceptionFilter } from '../../src/lib/http-exception.filter';
import { DrizzleQueryErrorFilter } from '../../src/drizzle/drizzle-query-error.filter';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../../src/auth/guards/auth.guard';
import { AuthService } from '../../src/auth/auth.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication<NestExpressApplication>();

  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);
  app.useGlobalGuards(new AuthGuard(authService, reflector));

  // 2. Stel de Global Prefix in, maar sluit assets uit indien nodig
  app.setGlobalPrefix('api', {
    exclude: ['assets/(.*)'], // Zorg dat /assets niet onder /api valt
  });

  // 3. Configureer de statische assets folder
  // We gebruiken process.cwd() om zeker te zijn dat we vanaf de root van het project zoeken
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/assets/', // Dit zorgt ervoor dat /public/logo.png bereikbaar is via /assets/logo.png
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new DrizzleQueryErrorFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          details: { body: formattedErrors },
        });
      },
    }),
  );
  await app.init();
  return app;
}
