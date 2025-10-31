import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackController } from './tracks.controller';

@Module({
  controllers: [TrackController],
  providers: [TracksService],
})
export class TracksModule {}
