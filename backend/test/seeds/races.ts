import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { races } from '../../src/drizzle/schema';

export const RACES_SEED = [
  {
    id: 1,
    slug: 'dutch-grand-prix',
    trackId: 1,
    date: new Date('2025-08-31'),
    calendarYear: 2025,
    weather: 'Sunny',
    trackRecord: '1:11.097',
  },
  {
    id: 2,
    slug: 'belgian-grand-prix',
    trackId: 2,
    date: new Date('2025-07-27'),
    calendarYear: 2025,
    weather: 'Rainy',
    trackRecord: '1:46.286',
  },
  {
    id: 3,
    slug: 'monaco-grand-prix',
    trackId: 3,
    date: new Date('2025-05-25'),
    calendarYear: 2025,
    weather: 'Cloudy',
    trackRecord: '1:12.909',
  },
];

export const seedRaces = async (db: DatabaseProvider) => {
  for (const race of RACES_SEED) {
    await db.insert(races).values(race);
  }
};

export const clearRaces = async (db: DatabaseProvider) => {
  await db.delete(races);
};
