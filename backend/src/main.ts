import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, CorsConfig, LogConfig } from './config/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import CustomLogger from './core/customLogger';
import { HttpExceptionFilter } from './lib/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<ServerConfig>);
  const log = config.get<LogConfig>('log')!;

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useLogger(
    new CustomLogger({
      logLevels: log.levels,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('f1-tracker')
    .setDescription('The f1-tracker API')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;

  app.enableCors({
    origins: cors.origins,
    maxAge: cors.maxAge,
  });

  await app.listen(port, () => {
    new Logger().log(`🚀 Server listening on http://localhost:${port}`);
  });
}

void bootstrap();
