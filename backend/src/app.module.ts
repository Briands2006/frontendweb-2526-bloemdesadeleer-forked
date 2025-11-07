import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UploadsModule } from './uploads/uploads.module';
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

@Module({
  imports: [
    UploadsModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TracksModule,
    DrizzleModule,
    DriversModule,
    TeamsModule,
    HealthModule,
    AuthModule,
    NewsModule,
  ],
  controllers: [
    AppController,
    HealthController,
    TrackController,
    DriversController,
    NewsController,
  ],
  providers: [AppService, NewsService],
})
export class AppModule {}
