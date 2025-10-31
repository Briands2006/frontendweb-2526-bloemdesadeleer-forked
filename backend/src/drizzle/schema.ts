import {
  int,
  varchar,
  text,
  mysqlTable,
  datetime,
  boolean,
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

export const teamsRelations = relations(teams, ({ many }) => ({
  drivers: many(drivers),
}));

export const driversRelations = relations(drivers, ({ one }) => ({
  team: one(teams, {
    fields: [drivers.teamId],
    references: [teams.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  newsArticles: many(news),
}));

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.authorId],
    references: [users.id],
  }),
  track: one(tracks, {
    fields: [news.trackId],
    references: [tracks.id],
  }),
}));

export const tracksRelations = relations(tracks, ({ many }) => ({
  relatedNews: many(news),
}));
