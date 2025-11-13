import { Injectable, NotFoundException } from '@nestjs/common';
import { calendar, races } from '../drizzle/schema';
import { type DatabaseProvider } from '../drizzle/drizzle.provider';
import { InjectDrizzle } from '../drizzle/drizzle.provider';
import {
  CalendarDetailResponseDto,
  CalendarListResponseDto,
} from './calendar.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<CalendarListResponseDto> {
    const dates = await this.db.query.calendar.findMany();
    return { dates };
  }

  async getByYear(year: number): Promise<CalendarDetailResponseDto> {
    const cal = await this.db.query.calendar.findFirst({
      where: eq(calendar.year, year),
    });

    if (!cal) {
      throw new NotFoundException(`Calendar for year ${year} not found`);
    }

    const racesInYear = await this.db.query.races.findMany({
      where: eq(races.calendarYear, year),
      with: {
        track: true,
      },
      orderBy: (r) => r.date,
    });

    return {
      year: cal.year,
      nrOfRaces: cal.nrOfRaces,
      races: racesInYear,
    };
  }
}
