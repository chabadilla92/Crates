import { pgTable, uuid, text, integer, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const beats = pgTable("beats", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  producerName: text("producer_name").notNull(),
  audioUrl: text("audio_url").notNull(),
  hlsManifestUrl: text("hls_manifest_url"),
  artworkUrl: text("artwork_url").notNull(),
  bpm: integer("bpm"),
  durationSeconds: integer("duration_seconds").notNull(),
  dropInSeconds: integer("drop_in_seconds").default(0),
  loopStartSeconds: integer("loop_start_seconds"),
  loopEndSeconds: integer("loop_end_seconds"),
  tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const savedBeats = pgTable("saved_beats", {
  id: uuid("id").primaryKey().defaultRandom(),
  beatId: uuid("beat_id")
    .notNull()
    .references(() => beats.id, { onDelete: "cascade" }),
  savedAt: timestamp("saved_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sessionFeedback = pgTable(
  "session_feedback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    beatId: uuid("beat_id")
      .notNull()
      .references(() => beats.id, { onDelete: "cascade" }),
    signal: text("signal").notNull(),
    sessionId: uuid("session_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check("signal_check", sql`${table.signal} IN ('like', 'dislike')`),
  ],
);

export type Beat = typeof beats.$inferSelect;
export type NewBeat = typeof beats.$inferInsert;
export type SavedBeat = typeof savedBeats.$inferSelect;
export type SessionFeedbackEntry = typeof sessionFeedback.$inferSelect;