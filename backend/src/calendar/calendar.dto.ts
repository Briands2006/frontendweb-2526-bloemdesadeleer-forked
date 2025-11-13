import { InferSelectModel } from 'drizzle-orm';
import { calendar, races, tracks } from '../drizzle/schema';

export type CalendarModel = InferSelectModel<typeof calendar>;
export type RaceModel = InferSelectModel<typeof races> & {
  track?: InferSelectModel<typeof tracks>;
};

export class CalendarListResponseDto {
  dates: CalendarModel[];
}

export class CalendarDetailResponseDto {
  year: number;
  nrOfRaces: number;
  races: RaceModel[];
}
