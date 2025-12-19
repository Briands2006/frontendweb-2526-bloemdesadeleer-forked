import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { calendar } from '../../src/drizzle/schema';

export const seedCalendar = async (db: DatabaseProvider) => {
  await db.insert(calendar).values({
    year: 2025,
    nrOfRaces: 24,
  });
};

export const clearCalendar = async (db: DatabaseProvider) => {
  await db.delete(calendar);
};
