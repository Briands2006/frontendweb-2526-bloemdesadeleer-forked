import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';

@Injectable()
export class DatabaseCheck {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async checkDatabaseStatus(): Promise<{
    database: 'UP' | 'DOWN';
    error?: string;
  }> {
    try {
      await this.db.execute(sql`SELECT 1`);
      return { database: 'UP' };
    } catch (error) {
      const errorMessage = `Failed to establish connection to database. Error: ${error.message}`;
      return { database: 'DOWN', error: errorMessage };
    }
  }
}
