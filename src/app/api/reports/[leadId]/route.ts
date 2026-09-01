import { NextRequest, NextResponse } from "next/server";
import { getLeadById } from "@/lib/leads";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;

  const lead = await getLeadById(leadId);

  if (!lead) {
    return NextResponse.json({ error: "Report not found." }, { status: 404 });
  }

  const latestReport = lead.reports?.[0];

  if (!latestReport) {
    return NextResponse.json({ error: "No report found for this lead." }, { status: 404 });
  }

  return NextResponse.json({
    leadId: lead.id,
    address: lead.address,
    bookingStatus: lead.bookingStatus,
    estimate: {
      price: latestReport.estimatedValue,
      priceRangeLow: latestReport.priceRangeLow,
      priceRangeHigh: latestReport.priceRangeHigh,
    },
    propertyDetails: {
      bedrooms: latestReport.bedrooms,
      bathrooms: latestReport.bathrooms,
      squareFootage: latestReport.squareFootage,
      yearBuilt: latestReport.yearBuilt,
      estimated: latestReport.propertyDetailsEstimated,
    },
    comparables: latestReport.comparables,
    marketStats: latestReport.marketStats,
    signal: {
      score: latestReport.signalScore,
      label: latestReport.signalLabel,
      tier: latestReport.signalTier,
    },
  });
}