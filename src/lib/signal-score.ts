/**
 * Signal Score™ calculation.
 *
 * Formula: (PriceMomentum * 0.30) + (DaysOnMarket * 0.25) + (InventoryLevel * 0.25) + (ValuePosition * 0.20)
 *
 * Updated for 2026 market conditions (client-provided thresholds, 2026-09).
 * These bands now apply uniformly across all tiers (Standard/Premium/Luxury).
 * Luxury tier still gets an expanded comp search radius (see rentcast.ts /
 * property-report route) — that's a data-fetching concern, not a scoring one.
 *
 * NOTE ON DATA MAPPING:
 * RentCast's /avm/value comparables do not expose a distinct "sold price vs list
 * price" field we can reliably use for an individual subject property (it isn't
 * itself listed). So "Price Momentum" is derived from the zip code's
 * month-over-month median sale price trend (saleData.history), which is the
 * closest live signal for "is this market heating up or cooling down".
 * "Days on Market" and "Inventory Level" come from zip-level saleData
 * (medianDaysOnMarket, totalListings/newListings). "Value Position" compares
 * the subject's estimated value against the zip's bedroom-matched median.
 */

import type { RentcastSaleData } from "./rentcast";

export type SignalTier = "standard" | "premium" | "luxury";

export type SignalLabel = "Opportunity Signal" | "Steady Signal" | "Strong Signal";

export interface SignalScoreFactors {
  priceMomentum: number;
  daysOnMarket: number;
  inventoryLevel: number;
  valuePosition: number;
}

export interface SignalScoreResult {
  score: number; // 0-100, rounded
  tier: SignalTier;
  label: SignalLabel;
  factors: SignalScoreFactors;
  raw: {
    medianDaysOnMarket: number | null;
    monthsOfInventory: number | null;
    momentumPct: number | null;
    medianPrice: number | null;
    subjectPrice: number;
  };
}

/* =====================================================================
   HELPERS
   ===================================================================== */

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation of a score within a band, low->high as value goes lowBound->highBound. */
function lerpScore(value: number, lowBound: number, highBound: number, lowScore: number, highScore: number): number {
  if (highBound === lowBound) return (lowScore + highScore) / 2;
  const t = clamp((value - lowBound) / (highBound - lowBound), 0, 1);
  return lowScore + t * (highScore - lowScore);
}

/** Tier is still used to decide the RentCast comp-search radius (luxury gets
 * a wider search), but no longer changes the score bands themselves. */
export function determineTier(estimatedValue: number): SignalTier {
  if (estimatedValue >= 1_000_000) return "luxury";
  if (estimatedValue >= 600_000) return "premium";
  return "standard";
}

export function scoreLabel(score: number): SignalLabel {
  if (score >= 80) return "Strong Signal";
  if (score >= 60) return "Steady Signal";
  return "Opportunity Signal";
}

/* =====================================================================
   FACTOR 1 — PRICE MOMENTUM (30%)
   Derived from zip-level month-over-month median sale price change.
   >= +1.5% => "above list" band (75-100)
   -1.5% .. +1.5% => "at list" band (45-74)
   < -1.5% => "below list" band (0-44)
   ===================================================================== */

function scorePriceMomentum(momentumPct: number | null): number {
  if (momentumPct === null) return 55; // neutral default when trend data unavailable

  if (momentumPct >= 1.5) {
    // 1.5% -> 75, 6%+ -> 100
    return lerpScore(momentumPct, 1.5, 6, 75, 100);
  }
  if (momentumPct >= -1.5) {
    // -1.5% -> 45, 1.5% -> 74
    return lerpScore(momentumPct, -1.5, 1.5, 45, 74);
  }
  // below -1.5%, down to -6% or worse -> 0
  return lerpScore(momentumPct, -6, -1.5, 0, 44);
}

function calcMomentumPct(saleData: RentcastSaleData | undefined): number | null {
  const history = saleData?.history;
  if (!history) return null;

  const months = Object.keys(history).sort(); // "YYYY-MM" sorts chronologically
  if (months.length < 2) return null;

  const latest = history[months[months.length - 1]];
  const previous = history[months[months.length - 2]];

  const latestMedian = latest?.medianPrice;
  const previousMedian = previous?.medianPrice;

  if (!latestMedian || !previousMedian) return null;

  return ((latestMedian - previousMedian) / previousMedian) * 100;
}

/* =====================================================================
   FACTOR 2 — DAYS ON MARKET (25%)
   Same bands across all tiers (2026 update):
   under 25 days -> 80-100, 25-45 days -> 50-79, over 45 days -> 0-49
   ===================================================================== */

function scoreDaysOnMarket(dom: number | null): number {
  if (dom === null) return 60;

  if (dom < 25) return lerpScore(dom, 0, 25, 100, 80);
  if (dom <= 45) return lerpScore(dom, 25, 45, 79, 50);
  return lerpScore(dom, 45, 120, 49, 0);
}

/* =====================================================================
   FACTOR 3 — INVENTORY LEVEL (25%)
   Same bands across all tiers (2026 update):
   under 2 months -> 80-100, 2-4 months -> 50-79, over 4 months -> 0-49
   Months of supply approximated as totalListings / newListings.
   ===================================================================== */

function calcMonthsOfInventory(saleData: RentcastSaleData | undefined): number | null {
  const total = saleData?.totalListings;
  const newListings = saleData?.newListings;
  if (!total || !newListings) return null;
  return total / newListings;
}

function scoreInventoryLevel(months: number | null): number {
  if (months === null) return 60;

  if (months < 2) return lerpScore(months, 0, 2, 100, 80);
  if (months <= 4) return lerpScore(months, 2, 4, 79, 50);
  return lerpScore(months, 4, 12, 49, 0);
}

/* =====================================================================
   FACTOR 4 — VALUE POSITION (20%) — unchanged
   above median (>+5%) 60-100, at median (±5%) 40-59, below median (<-5%) 0-39
   ===================================================================== */

function scoreValuePosition(subjectPrice: number, medianPrice: number | null): number {
  if (!medianPrice) return 50;

  const diffPct = ((subjectPrice - medianPrice) / medianPrice) * 100;

  if (diffPct > 5) return lerpScore(diffPct, 5, 40, 60, 100);
  if (diffPct >= -5) return lerpScore(diffPct, -5, 5, 40, 59);
  return lerpScore(diffPct, -40, -5, 0, 39);
}

/**
 * Picks the most relevant median price to compare the subject against.
 * Prefers the zip's bedroom-matched median (e.g. all 5-bed homes) over the
 * blended all-property-types median.
 */
function pickComparisonMedian(saleData: RentcastSaleData | undefined, subjectBedrooms: number | undefined): number | null {
  if (subjectBedrooms != null) {
    const match = saleData?.dataByBedrooms?.find((entry) => entry.bedrooms === subjectBedrooms);
    if (match?.medianPrice) return match.medianPrice;
  }
  return saleData?.medianPrice ?? null;
}

/* =====================================================================
   MAIN ENTRY POINT
   ===================================================================== */

export function calculateSignalScore(input: {
  subjectPrice: number;
  subjectBedrooms?: number;
  saleData: RentcastSaleData | undefined;
}): SignalScoreResult {
  const { subjectPrice, subjectBedrooms, saleData } = input;

  const tier = determineTier(subjectPrice);

  const medianDaysOnMarket = saleData?.medianDaysOnMarket ?? null;
  const monthsOfInventory = calcMonthsOfInventory(saleData);
  const momentumPct = calcMomentumPct(saleData);
  const medianPrice = pickComparisonMedian(saleData, subjectBedrooms);

  const factors: SignalScoreFactors = {
    priceMomentum: scorePriceMomentum(momentumPct),
    daysOnMarket: scoreDaysOnMarket(medianDaysOnMarket),
    inventoryLevel: scoreInventoryLevel(monthsOfInventory),
    valuePosition: scoreValuePosition(subjectPrice, medianPrice),
  };

  const rawScore =
    factors.priceMomentum * 0.3 +
    factors.daysOnMarket * 0.25 +
    factors.inventoryLevel * 0.25 +
    factors.valuePosition * 0.2;

  const score = Math.round(clamp(rawScore, 0, 100));

  return {
    score,
    tier,
    label: scoreLabel(score),
    factors,
    raw: {
      medianDaysOnMarket,
      monthsOfInventory,
      momentumPct,
      medianPrice,
      subjectPrice,
    },
  };
}