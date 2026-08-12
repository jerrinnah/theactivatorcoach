import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  integer,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This database holds psychotherapy client records. Every table here is
 * confidential health information — see docs/DATA-PROTECTION.md before adding
 * to it, and never log row contents.
 */

export const clientStatus = pgEnum("client_status", [
  "enquiry",
  "active",
  "paused",
  "completed",
  "archived",
]);

export const serviceType = pgEnum("service_type", [
  "individual",
  "couples",
  "before_you_marry",
  "annual_review",
  "intensive",
  "diaspora",
  "other",
]);

export const clients = pgTable(
  "clients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: text("full_name").notNull(),
    email: text("email"),
    phone: text("phone"),
    /** Where they came from — a contact form, a referral, Instagram. */
    source: text("source"),
    service: serviceType("service").notNull().default("individual"),
    status: clientStatus("status").notNull().default("enquiry"),
    /** Free-text background. Clinical detail belongs in progressNotes. */
    notes: text("notes"),
    startedOn: date("started_on"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    /** Soft delete. Records are retained, never hard-deleted, by default. */
    archivedAt: timestamp("archived_at", { withTimezone: true }),
  },
  (t) => [
    index("clients_status_idx").on(t.status),
    index("clients_name_idx").on(t.fullName),
  ],
);

export const progressNotes = pgTable(
  "progress_notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "restrict" }),
    sessionDate: date("session_date").notNull(),
    /** Session number within this client's course of work. */
    sessionNumber: integer("session_number"),
    /** The clinical note itself. */
    content: text("content").notNull(),
    /** What was agreed for next time. */
    nextSteps: text("next_steps"),
    /** Coarse 1–5 progress signal, for the trend on the client page. */
    progressRating: integer("progress_rating"),
    /** Clerk user id of whoever wrote it. */
    authorId: text("author_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("notes_client_idx").on(t.clientId),
    index("notes_session_date_idx").on(t.sessionDate),
  ],
);

/**
 * Who looked at, or changed, which record and when. Append-only: nothing in
 * the app updates or deletes rows here. Required to answer "who accessed this
 * client's notes" after the fact.
 */
export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorId: text("actor_id").notNull(),
    actorEmail: text("actor_email"),
    /** viewed | created | updated | archived */
    action: text("action").notNull(),
    /** client | progress_note */
    entity: text("entity").notNull(),
    entityId: text("entity_id"),
    ip: text("ip"),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("audit_at_idx").on(t.at),
    index("audit_entity_idx").on(t.entity, t.entityId),
  ],
);

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ProgressNote = typeof progressNotes.$inferSelect;
export type NewProgressNote = typeof progressNotes.$inferInsert;
