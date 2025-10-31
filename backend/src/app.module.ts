import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UploadsModule } from '../uploads/uploads.module';
import { ConfigModule } from '@nestjs/config';
import { TracksController } from './tracks/tracks.controller';
import { TracksModule } from './tracks/tracks.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import config from '../config/config';

@Module({
  imports: [
    UploadsModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TracksModule,
    DrizzleModule,
  ],
  controllers: [AppController, HealthController, TracksController],
  providers: [AppService],
})
export class AppModule {}
