import {
  int,
  varchar,
  text,
  mysqlTable,
  datetime,
  boolean,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  dateJoined: datetime('date_joined')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isAdmin: boolean('is_admin').notNull().default(false),
});

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

export const drivers = mysqlTable('drivers', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  number: int('number').notNull(),
  country: varchar('country', { length: 5 }).notNull(),
  photo: varchar('photo', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  teamId: int('team_id', { unsigned: true })
    .references(() => teams.id, { onDelete: 'cascade' })
    .notNull(),
});

export const track = mysqlTable('tracks', {
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
  trackId: int('track_id', { unsigned: true }).references(() => track.id, {
    onDelete: 'set null',
  }),
});

export const race = mysqlTable('race', {
  id: int('id', { unsigned: true }).primaryKey(),
  date: datetime('date').notNull(),
  weahter: varchar('weather', { length: 100 }).notNull(),
  trackRecord: varchar('trackRecord', { length: 50 }),
  trackId: int('trackId', { unsigned: true })
    .references(() => track.id, { onDelete: 'set null' })
    .notNull(),
  calendarYear: int('calendarYear')
    .references(() => calendar.year, { onDelete: 'set null' })
    .notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const calendar = mysqlTable('calender', {
  year: int('year', { unsigned: true }).primaryKey(),
  nrOfRaces: int('nrOfRaces').notNull(),
});

export const raceResults = mysqlTable(
  'raceResults',
  {
    raceId: int('raceId', { unsigned: true })
      .references(() => race.id, { onDelete: 'cascade' })
      .notNull(),
    driverId: int('driverId', { unsigned: true })
      .references(() => drivers.id, { onDelete: 'cascade' })
      .notNull(),
    position: int('position').notNull(),
    points: int('points').notNull(),
    isWinner: boolean('isWinner').notNull().default(false),
  },
  (table) => [primaryKey({ columns: [table.raceId, table.driverId] })],
);

export const teamsRelations = relations(teams, ({ many }) => ({
  drivers: many(drivers),
}));

export const driversRelations = relations(drivers, ({ one, many }) => ({
  team: one(teams, {
    fields: [drivers.teamId],
    references: [teams.id],
  }),
  raceRelations: many(raceResults),
}));

export const usersRelations = relations(users, ({ many }) => ({
  newsArticles: many(news),
}));

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.authorId],
    references: [users.id],
  }),
  track: one(track, {
    fields: [news.trackId],
    references: [track.id],
  }),
}));

export const tracksRelations = relations(track, ({ many }) => ({
  relatedNews: many(news),
  race: many(race),
}));

export const raceRelations = relations(race, ({ one, many }) => ({
  track: one(track, {
    fields: [race.trackId],
    references: [track.id],
  }),
  calendar: one(calendar, {
    fields: [race.calendarYear],
    references: [calendar.year],
  }),
  results: many(raceResults),
}));

export const raceResultRelations = relations(raceResults, ({ one }) => ({
  race: one(race, {
    fields: [raceResults.raceId],
    references: [race.id],
  }),
  drivers: one(drivers, {
    fields: [raceResults.driverId],
    references: [drivers.id],
  }),
}));

export const calendarRelations = relations(calendar, ({ many }) => ({
  races: many(race),
}));
