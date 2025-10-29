import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UploadsModule } from '../uploads/uploads.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';

@Module({
  imports: [
    UploadsModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
