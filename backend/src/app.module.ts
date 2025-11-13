import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ConfigModule } from '@nestjs/config';
import { TrackController } from './tracks/tracks.controller';
import { TracksModule } from './tracks/tracks.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DriversModule } from './drivers/drivers.module';
import config from './config/config';
import { DriversController } from './drivers/drivers.controller';
import { TeamsModule } from './teams/teams.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { NewsModule } from './news/news.module';
import { SessionModule } from './session/session.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarModule } from './calendar/calendar.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/assets',
    }),
    TracksModule,
    DrizzleModule,
    DriversModule,
    TeamsModule,
    HealthModule,
    AuthModule,
    NewsModule,
    SessionModule,
    UserModule,
    CalendarModule,
  ],
  controllers: [
    AppController,
    HealthController,
    TrackController,
    DriversController,
    NewsController,
    UserController,
    CalendarController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
    AppService,
    NewsService,
  ],
})
export class AppModule {}
