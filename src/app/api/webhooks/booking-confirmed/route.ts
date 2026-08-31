import { NextRequest, NextResponse } from "next/server";
import { confirmBooking, getLeadById, savePdfRecord } from "@/lib/leads";
import { generateFullReportPdf } from "@/lib/pdf/generate";
import { uploadPdf } from "@/lib/storage";
import { sendEmail, fullReportEmailHtml } from "@/lib/email";

export const runtime = "nodejs";

interface BookingWebhookBody {
  internalLeadId?: string;
  internal_lead_id?: string;
  email?: string;
}

export async function POST(req: NextRequest) {
  let body: BookingWebhookBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const leadId = body.internalLeadId ?? body.internal_lead_id;

  if (!leadId) {
    console.error("Booking webhook missing internalLeadId:", body);
    return NextResponse.json({ error: "internalLeadId is required." }, { status: 400 });
  }

  const leadWithReport = await getLeadById(leadId);

  if (!leadWithReport) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  await confirmBooking(leadId);

  const latestReport = leadWithReport.reports?.[0];

  if (!latestReport) {
    // Booking is still confirmed even if we can't build the full PDF yet —
    // just skip PDF generation rather than failing the whole webhook.
    return NextResponse.json({ ok: true, pdfGenerated: false });
  }

  try {
    const comparables = (latestReport.comparables as Array<Record<string, unknown>>) ?? [];
    const marketStats = (latestReport.marketStats as Record<string, unknown>) ?? {};

    const pdfBuffer = await generateFullReportPdf({
      address: leadWithReport.address,
      estimatedValue: `$${latestReport.estimatedValue.toLocaleString()}`,
      rangeLow: `$${latestReport.priceRangeLow.toLocaleString()}`,
      rangeHigh: `$${latestReport.priceRangeHigh.toLocaleString()}`,
      signalScore: latestReport.signalScore,
      signalLabel: latestReport.signalLabel,
      bedrooms: latestReport.bedrooms ?? "N/A",
      bathrooms: latestReport.bathrooms ?? "N/A",
      squareFootage: latestReport.squareFootage ? `${latestReport.squareFootage.toLocaleString()} sq ft` : "N/A",
      yearBuilt: latestReport.yearBuilt ?? "N/A",
      comparables,
      medianPrice: (marketStats.medianPrice as number) ?? null,
      medianPricePerSqft: (marketStats.medianPricePerSquareFoot as number) ?? null,
      medianDaysOnMarket: (marketStats.medianDaysOnMarket as number) ?? null,
    });

    const fileUrl = await uploadPdf(`reports/${leadId}-full.pdf`, pdfBuffer);

    const pdfRecord = await savePdfRecord({
      leadId,
      reportId: latestReport.id,
      type: "full",
      fileUrl,
    });

    const publicReportUrl = `${req.nextUrl.origin}/api/reports/download/${pdfRecord.id}`;

    await sendEmail({
      to: leadWithReport.email,
      subject: "Your Full Home Report — Comparable Sales Included",
      html: fullReportEmailHtml({
        firstName: leadWithReport.firstName,
        reportUrl: publicReportUrl,
        address: leadWithReport.address,
      }),
    });

    return NextResponse.json({ ok: true, pdfGenerated: true });
  } catch (error) {
    console.error("Full PDF generation/email failed:", error);
    return NextResponse.json({ ok: true, pdfGenerated: false });
  }
}