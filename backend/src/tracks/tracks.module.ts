import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [TrackController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
