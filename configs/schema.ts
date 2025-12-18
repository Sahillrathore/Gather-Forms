// configs/schema.ts
import { serial } from "drizzle-orm/mysql-core";
import { pgTable, text, integer, varchar } from "drizzle-orm/pg-core";

// Use a string id for now to avoid db-specific serial/sequence APIs mixing cores.
// If you want auto-increment integers we can change this to a Postgres serial/sequence later.
export const usersTable = pgTable("users_table", {
  id: varchar("id").primaryKey(),        // simple cross-driver primary key
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

export const JsonForms = pgTable("jsonForms", {
  id: varchar("id").primaryKey(),
  jsonform: text("jsonForm").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

// Export default object so drizzle-kit can pick it up for migrations
export default { usersTable, JsonForms };
