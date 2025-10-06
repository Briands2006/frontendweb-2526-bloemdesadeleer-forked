import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UploadsModule } from 'uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
