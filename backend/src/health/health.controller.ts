import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { type HealthType } from '../types/health';
import CustomLogger from '../core/customLogger';
import { DatabaseCheck } from './database.check';
import { Public } from '../auth/decorators/public.decorator';

const customLogger = new CustomLogger();

@Controller('health')
export class HealthController {
  constructor(private readonly databaseCheck: DatabaseCheck) {}

  @Public()
  @Get('ping')
  ping(): { pong: boolean } {
    return { pong: true };
  }

  @Get('liveness')
  getLivenessStatus(): HealthType {
    customLogger.log('Liveness check requested.');
    return {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      message: 'Service is running and responsive.',
    };
  }

  @Get('readiness')
  @HttpCode(HttpStatus.OK)
  async getReadinessStatus(): Promise<HealthType> {
    customLogger.log('Server check requested');

    const dbStatus = await this.databaseCheck.checkDatabaseStatus();
    const isDatabaseConnected = dbStatus.database === 'UP'; // boolean voor de check door te geven aan dev

    if (!isDatabaseConnected) {
      if (dbStatus.error) customLogger.error('check failed!', dbStatus.error);

      return {
        status: 'DOWN',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        message: 'Service is not ready (Database connection failed).',
      };
    }

    return {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      message: 'Service is ready (Database established connection).',
    };
  }
}
