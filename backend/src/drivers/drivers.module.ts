import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { DriverService } from './driver.service';

@Module({
  imports: [DrizzleModule],
  controllers: [DriversController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriversModule {}
