import { timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  surname: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phoneNumber: varchar({ length: 255 }).notNull().unique(),
  bankDetails: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull(),
});

export const depotPointsTable = pgTable("depot_points", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  adress: varchar({ length: 255 }).notNull(),
  contact: varchar({ length: 255 }).notNull(),
  openTime: timestamp().notNull(),
  closeTime: timestamp().notNull(),
});

export const roundsTable = pgTable("rounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  preparationDay: timestamp().notNull(),
  deliveryDay: timestamp().notNull(),
});

export const roundDepotsTable = pgTable("round_depots", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roundId: integer().notNull().references(() => roundsTable.id),
  depotId: integer().notNull().references(() => depotPointsTable.id),
  order: integer().notNull(),
});