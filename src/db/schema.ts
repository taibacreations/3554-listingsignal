import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* =====================================================================
   ENUMS
   ===================================================================== */

export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed"]);
export const signalTierEnum = pgEnum("signal_tier", ["standard", "premium", "luxury"]);
export const pdfTypeEnum = pgEnum("pdf_type", ["partial", "full"]);
export const updateStatusEnum = pgEnum("update_status", ["success", "failed"]);

/* =====================================================================
   LEADS — one row per homeowner who submitted the capture form
   ===================================================================== */

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),

  address: text("address").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),

  bookingStatus: bookingStatusEnum("booking_status").notNull().default("pending"),
  bookingConfirmedAt: timestamp("booking_confirmed_at", { withTimezone: true }),

  ghlWebhookSent: boolean("ghl_webhook_sent").notNull().default(false),
  ghlWebhookSentAt: timestamp("ghl_webhook_sent_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* =====================================================================
   REPORTS — the RentCast + Signal Score snapshot for a lead.
   A lead can have more than one report over time (re-runs, 30-day cron
   refresh) — `isLatest` marks the current one the UI/PDFs should use.
   ===================================================================== */

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),

  estimatedValue: integer("estimated_value").notNull(),
  priceRangeLow: integer("price_range_low").notNull(),
  priceRangeHigh: integer("price_range_high").notNull(),

  signalScore: integer("signal_score").notNull(),
  signalTier: signalTierEnum("signal_tier").notNull(),
  signalLabel: varchar("signal_label", { length: 40 }).notNull(), // "Strong Signal" | "Steady Signal" | "Opportunity Signal"

  bedrooms: integer("bedrooms"),
  bathrooms: doublePrecision("bathrooms"),
  squareFootage: integer("square_footage"),
  yearBuilt: integer("year_built"),
  propertyDetailsEstimated: boolean("property_details_estimated").notNull().default(false),

  // Raw supporting data kept as JSON so we don't need to re-call RentCast
  // to re-render the report or regenerate a PDF later.
  comparables: jsonb("comparables").notNull(),
  marketStats: jsonb("market_stats"),

  isLatest: boolean("is_latest").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* =====================================================================
   PDFS — generated report documents. The file itself lives in blob
   storage (Vercel Blob); this row just tracks the reference + status.
   ===================================================================== */

export const pdfs = pgTable("pdfs", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  reportId: uuid("report_id").references(() => reports.id, { onDelete: "set null" }),

  type: pdfTypeEnum("type").notNull(), // "partial" | "full"
  fileUrl: text("file_url").notNull(),

  generatedAt: timestamp("generated_at", { withTimezone: true }).notNull().defaultNow(),
  emailedAt: timestamp("emailed_at", { withTimezone: true }),
});

/* =====================================================================
   MARKET UPDATE LOGS — one row per 30-day cron run per lead
   ===================================================================== */

export const marketUpdateLogs = pgTable("market_update_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),

  previousScore: integer("previous_score"),
  newScore: integer("new_score"),

  status: updateStatusEnum("status").notNull(),
  errorMessage: text("error_message"),

  sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
});

/* =====================================================================
   RELATIONS (for Drizzle's relational query API)
   ===================================================================== */

export const leadsRelations = relations(leads, ({ many }) => ({
  reports: many(reports),
  pdfs: many(pdfs),
  marketUpdateLogs: many(marketUpdateLogs),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  lead: one(leads, { fields: [reports.leadId], references: [leads.id] }),
  pdfs: many(pdfs),
}));

export const pdfsRelations = relations(pdfs, ({ one }) => ({
  lead: one(leads, { fields: [pdfs.leadId], references: [leads.id] }),
  report: one(reports, { fields: [pdfs.reportId], references: [reports.id] }),
}));

export const marketUpdateLogsRelations = relations(marketUpdateLogs, ({ one }) => ({
  lead: one(leads, { fields: [marketUpdateLogs.leadId], references: [leads.id] }),
}));

/* =====================================================================
   INFERRED TYPES — for use across the app
   ===================================================================== */

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;

export type Pdf = typeof pdfs.$inferSelect;
export type NewPdf = typeof pdfs.$inferInsert;

export type MarketUpdateLog = typeof marketUpdateLogs.$inferSelect;
export type NewMarketUpdateLog = typeof marketUpdateLogs.$inferInsert;