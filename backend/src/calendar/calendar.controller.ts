import { Get, Controller, ParseIntPipe, Param } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  @Public()
  async getAll() {
    return this.calendarService.getAll();
  }

  @Get(':year')
  @Public()
  async getByYear(@Param('year', ParseIntPipe) year: number) {
    return this.calendarService.getByYear(year);
  }
}
