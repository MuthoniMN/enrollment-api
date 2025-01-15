import { integer, pgTable, serial, text, timestamp, unique, boolean } from 'drizzle-orm/pg-core';

export const adminTable = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const trackTable = pgTable('tracks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phoneNumber').notNull().unique(),
  trackId: integer('trackId').notNull().references(() => trackTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const cohortTable = pgTable('cohorts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  startDate: timestamp('startDate').notNull(),
  orientationDate: timestamp('orientationDate'),
  duration: text('duration'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const enrollmentTable = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  admitted: boolean('admitted'),
  confirmed: boolean('confirmed'),
  deadline: timestamp('deadline'),
  user: integer('user').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  cohort: integer('cohort').notNull().references(() => cohortTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (e) => [{
  unq: unique().on(e.user, e.cohort)
}])

export type InsertAdmin = typeof adminTable.$inferInsert;
export type SelectAdmin = typeof adminTable.$inferSelect;

export type InsertTrack = typeof trackTable.$inferInsert;
export type SelectTrack = typeof trackTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCohort = typeof cohortTable.$inferInsert;
export type SelectCohort = typeof cohortTable.$inferSelect;

export type InsertEnrollment = typeof enrollmentTable.$inferInsert;
export type SelectEnrollment = typeof enrollmentTable.$inferSelect;

