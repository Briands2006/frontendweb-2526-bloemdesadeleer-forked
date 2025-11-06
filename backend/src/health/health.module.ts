import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DatabaseCheck } from './database.check';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [HealthController],
  providers: [DatabaseCheck],
  exports: [DatabaseCheck],
})
export class HealthModule {}
