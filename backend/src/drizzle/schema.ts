import {
  int,
  varchar,
  text,
  mysqlTable,
  datetime,
  boolean,
  primaryKey,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';

// ---------- USERS ----------
export const users = mysqlTable(
  'users',
  {
    id: int('id', { unsigned: true }).primaryKey().autoincrement(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    birhtdate: datetime('birhtdate').notNull(),
    dateJoined: datetime('date_joined')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    isAdmin: boolean('is_admin').notNull().default(false),
  },
  (table) => [uniqueIndex('idx_user_email_unique').on(table.email)],
);

// ---------- TEAMS ----------
export const teams = mysqlTable('teams', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  base: varchar('base', { length: 255 }).notNull(),
  chief: varchar('chief', { length: 255 }).notNull(),
  championships: int('championships').notNull().default(0),
  logo: varchar('logo', { length: 255 }).notNull(),
  car: varchar('car', { length: 255 }).notNull(),
  info: text('info').notNull(),
  primaryColor: varchar('primary_color', { length: 10 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

// ---------- DRIVERS ----------
export const drivers = mysqlTable('drivers', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  number: int('number').notNull(),
  country: varchar('country', { length: 5 }).notNull(),
  photo: varchar('photo', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  teamId: int('team_id', { unsigned: true })
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
});

// ---------- TRACKS ----------
export const tracks = mysqlTable('tracks', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  lengthKm: varchar('length_km', { length: 10 }).notNull(),
  laps: int('laps').notNull(),
  fastestLapTime: varchar('fastest_lap_time', { length: 50 }),
  fastestLapDriver: varchar('fastest_lap_driver', { length: 255 }),
  fastestLapYear: int('fastest_lap_year'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

// ---------- CALENDAR ----------
export const calendar = mysqlTable('calendar', {
  year: int('year', { unsigned: true }).primaryKey(),
  nrOfRaces: int('nr_of_races').notNull(),
});

// ---------- RACES ----------
export const races = mysqlTable('races', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  date: datetime('date').notNull(),
  weather: varchar('weather', { length: 100 }).notNull(),
  trackRecord: varchar('track_record', { length: 50 }),
  trackId: int('track_id', { unsigned: true })
    .notNull()
    .references(() => tracks.id, { onDelete: 'cascade' }),
  calendarYear: int('calendar_year', { unsigned: true })
    .notNull()
    .references(() => calendar.year, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

// ---------- RACE RESULTS ----------
export const raceResults = mysqlTable(
  'race_results',
  {
    raceId: int('race_id', { unsigned: true })
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    driverId: int('driver_id', { unsigned: true })
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    position: int('position').notNull(),
    points: int('points').notNull(),
    isWinner: boolean('is_winner').notNull().default(false),
  },
  (table) => [primaryKey({ columns: [table.raceId, table.driverId] })],
);

// ---------- NEWS ----------
export const news = mysqlTable('news', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary').notNull(),
  fullContent: text('full_content').notNull(),
  imageUrl: varchar('image_url', { length: 255 }),
  date: datetime('date').notNull(),
  tags: varchar('tags', { length: 255 }),
  authorId: int('author_id', { unsigned: true }).references(() => users.id, {
    onDelete: 'set null',
  }),
  trackId: int('track_id', { unsigned: true }).references(() => tracks.id, {
    onDelete: 'set null',
  }),
});

// ---------- FavoriteDriver ----------
export const FavoriteDriver = mysqlTable('favoriteDriver', {
  userId: int('userId', { unsigned: true })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  driverId: int('driverId', { unsigned: true })
    .references(() => drivers.id, { onDelete: 'cascade' })
    .notNull(),
});

export const FavoriteTrack = mysqlTable(
  'favoriteTrack',
  {
    userId: int('userId', { unsigned: true })
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    trackId: int('trackId', { unsigned: true })
      .references(() => tracks.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.trackId] })],
);

// ---------- RELATIONS ----------
export const teamsRelations = relations(teams, ({ many }) => ({
  drivers: many(drivers),
}));

export const driversRelations = relations(drivers, ({ one, many }) => ({
  team: one(teams, { fields: [drivers.teamId], references: [teams.id] }),
  raceResults: many(raceResults),
}));

export const usersRelations = relations(users, ({ many }) => ({
  newsArticles: many(news),
}));

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, { fields: [news.authorId], references: [users.id] }),
  track: one(tracks, { fields: [news.trackId], references: [tracks.id] }),
}));

export const tracksRelations = relations(tracks, ({ many }) => ({
  newsArticles: many(news),
  races: many(races),
}));

export const racesRelations = relations(races, ({ one, many }) => ({
  track: one(tracks, { fields: [races.trackId], references: [tracks.id] }),
  calendar: one(calendar, {
    fields: [races.calendarYear],
    references: [calendar.year],
  }),
  results: many(raceResults),
}));

export const raceResultsRelations = relations(raceResults, ({ one }) => ({
  race: one(races, { fields: [raceResults.raceId], references: [races.id] }),
  driver: one(drivers, {
    fields: [raceResults.driverId],
    references: [drivers.id],
  }),
}));

export const calendarRelations = relations(calendar, ({ many }) => ({
  races: many(races),
}));

export const FavoriteDriverRelations = relations(FavoriteDriver, ({ one }) => ({
  drivers: one(drivers, {
    fields: [FavoriteDriver.driverId],
    references: [drivers.id],
  }),
}));

export const FavoriteTracksRelations = relations(FavoriteTrack, ({ one }) => ({
  tracks: one(tracks, {
    fields: [FavoriteTrack.trackId],
    references: [tracks.id],
  }),
}));
