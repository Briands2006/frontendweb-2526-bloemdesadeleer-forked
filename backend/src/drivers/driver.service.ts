import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { DriverResponseDto, DriverListResponseDto } from './driver.dto';
import { eq } from 'drizzle-orm';
import { drivers } from '../drizzle/schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<DriverListResponseDto> {
    const drivers = await this.db.query.drivers.findMany();
    return { drivers };
  }

  async getById(id: number): Promise<DriverResponseDto> {
    const driver = await this.db.query.drivers.findFirst({
      where: eq(drivers.id, id),
    });
    if (!driver) {
      throw new NotFoundException('No driver with that id exist');
    }
    return driver;
  }

  async getBySlug(slug: string): Promise<DriverResponseDto> {
    const driver = await this.db.query.drivers.findFirst({
      where: eq(drivers.slug, slug),
    });
    if (!driver) {
      throw new NotFoundException('No driver with this slug exists');
    }
    return driver;
  }
}
