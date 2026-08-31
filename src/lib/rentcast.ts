/**
 * RentCast API client.
 * Docs: https://developers.rentcast.io/reference
 *
 * Requires RENTCAST_API_KEY in environment (.env.local).
 * This file is server-only — never import it in a "use client" component.
 */

const RENTCAST_BASE_URL = "https://api.rentcast.io/v1";

function getApiKey(): string {
  const key = process.env.RENTCAST_API_KEY;
  if (!key) {
    throw new Error("RENTCAST_API_KEY is missing from environment variables.");
  }
  return key;
}

async function rentcastFetch<T>(path: string, params: Record<string, string | number | boolean | undefined>): Promise<T> {
  const url = new URL(`${RENTCAST_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Api-Key": getApiKey(),
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new RentcastApiError(res.status, `RentCast request failed (${res.status}) for ${path}: ${body}`);
  }

  return (await res.json()) as T;
}

export class RentcastApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "RentcastApiError";
    this.status = status;
  }
}

/* =====================================================================
   TYPES — only the fields we actually use are typed strictly;
   everything else is allowed through via an index signature so we
   don't break if RentCast adds fields.
   ===================================================================== */

export interface RentcastComparable {
  id: string;
  formattedAddress: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  yearBuilt?: number;
  status?: string; // "Active" | "Sold" | etc.
  price: number; // listed price or rent
  listingType?: string;
  listedDate?: string;
  removedDate?: string;
  lastSeenDate?: string;
  daysOnMarket?: number;
  distance: number; // miles
  correlation: number; // 0-1 similarity
  [key: string]: unknown;
}

export interface RentcastSubjectProperty {
  id?: string;
  formattedAddress?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  county?: string;
  latitude?: number;
  longitude?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  lotSize?: number;
  yearBuilt?: number;
  lastSaleDate?: string;
  lastSalePrice?: number;
  [key: string]: unknown;
}

export interface RentcastValueEstimateResponse {
  price: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  subjectProperty: RentcastSubjectProperty;
  comparables: RentcastComparable[];
}

export interface RentcastSaleStats {
  averagePrice?: number;
  medianPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  averagePricePerSquareFoot?: number;
  medianPricePerSquareFoot?: number;
  averageDaysOnMarket?: number;
  medianDaysOnMarket?: number;
  minDaysOnMarket?: number;
  maxDaysOnMarket?: number;
  newListings?: number;
  totalListings?: number;
  [key: string]: unknown;
}

export interface RentcastMarketHistoryEntry extends RentcastSaleStats {
  date: string;
}

export interface RentcastSaleStatsByBedrooms extends RentcastSaleStats {
  bedrooms: number;
}

export interface RentcastSaleData extends RentcastSaleStats {
  lastUpdatedDate?: string;
  history?: Record<string, RentcastMarketHistoryEntry>;
  dataByBedrooms?: RentcastSaleStatsByBedrooms[];
}

export interface RentcastMarketStatsResponse {
  id: string;
  zipCode: string;
  saleData?: RentcastSaleData;
  rentalData?: Record<string, unknown>;
}

/* =====================================================================
   VALUE ESTIMATE — /avm/value
   ===================================================================== */

export interface GetValueEstimateOptions {
  compCount?: number; // 5-25, RentCast default 15
  maxRadius?: number; // miles
  daysOld?: number;
}

export async function getValueEstimate(
  address: string,
  options: GetValueEstimateOptions = {},
): Promise<RentcastValueEstimateResponse> {
  return rentcastFetch<RentcastValueEstimateResponse>("/avm/value", {
    address,
    compCount: options.compCount ?? 20,
    maxRadius: options.maxRadius,
    daysOld: options.daysOld,
    lookupSubjectAttributes: true,
  });
}

/* =====================================================================
   MARKET STATISTICS — /markets
   ===================================================================== */

export async function getMarketStatistics(zipCode: string): Promise<RentcastMarketStatsResponse> {
  return rentcastFetch<RentcastMarketStatsResponse>("/markets", {
    zipCode,
    dataType: "Sale",
    historyRange: 6,
  });
}