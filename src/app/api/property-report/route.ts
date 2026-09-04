import { NextRequest, NextResponse } from "next/server";
import {
  getValueEstimate,
  getMarketStatistics,
  RentcastApiError,
} from "@/lib/rentcast";
import { calculateSignalScore, scoreLabel } from "@/lib/signal-score";
import {
  createLead,
  createReport,
  markGhlWebhookSent,
  savePdfRecord,
} from "@/lib/leads";
import { sendLeadToGhl } from "@/lib/ghl";
import { generatePartialReportPdf } from "@/lib/pdf/generate";
import { uploadPdf } from "@/lib/storage";
import { sendEmail, partialReportEmailHtml } from "@/lib/email";
import { estimateConfidence, formatConfidence } from "@/lib/format";

export const runtime = "nodejs";

function formatCurrencyForPdf(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function messageForLabel(label: string): string {
  if (label === "Strong Signal") {
    return "The market is working in your favor. Buyer demand is high, inventory is low, and homes like yours are selling fast. This is a strong window to act.";
  }
  if (label === "Steady Signal") {
    return "Market conditions are favorable in your area. Buyer demand is active and homes are moving. Smart pricing and presentation could put you in a strong position right now.";
  }
  return "The market is building momentum in your area. Homeowners who position now often see stronger results than those who wait for peak conditions.";
}

interface RequestBody {
  address: string;
  latitude: number | null;
  longitude: number | null;
  firstName: string;
  email: string;
  phone: string;
}

export async function POST(req: NextRequest) {
  let body: RequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const address = body.address?.trim();
  const firstName = body.firstName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!address) {
    return NextResponse.json({ error: "Address is required." }, { status: 400 });
  }
  if (!firstName || !email || !phone) {
    return NextResponse.json(
      { error: "First name, email, and phone are required." },
      { status: 400 },
    );
  }

  try {
    let valueEstimate = await getValueEstimate(address, { compCount: 20 });

    const subjectPrice = valueEstimate.price;
    const zipCode = valueEstimate.subjectProperty?.zipCode;

    if (subjectPrice >= 1_000_000) {
      const hasEnoughComps = valueEstimate.comparables?.length >= 3;
      if (!hasEnoughComps) {
        valueEstimate = await getValueEstimate(address, {
          compCount: 25,
          maxRadius: 3,
        });
      }
    }

    const marketStats = zipCode ? await getMarketStatistics(zipCode) : null;

    const signal = calculateSignalScore({
      subjectPrice,
      subjectBedrooms: valueEstimate.subjectProperty?.bedrooms,
      saleData: marketStats?.saleData,
    });

    const topComp = valueEstimate.comparables?.[0];
    const hasOwnAttributes =
      valueEstimate.subjectProperty?.bedrooms != null &&
      valueEstimate.subjectProperty?.bathrooms != null &&
      valueEstimate.subjectProperty?.squareFootage != null;

    const propertyDetails = hasOwnAttributes
      ? {
          bedrooms: valueEstimate.subjectProperty.bedrooms ?? null,
          bathrooms: valueEstimate.subjectProperty.bathrooms ?? null,
          squareFootage: valueEstimate.subjectProperty.squareFootage ?? null,
          yearBuilt: valueEstimate.subjectProperty.yearBuilt ?? null,
          estimated: false,
        }
      : {
          bedrooms: topComp?.bedrooms ?? null,
          bathrooms: topComp?.bathrooms ?? null,
          squareFootage: topComp?.squareFootage ?? null,
          yearBuilt: topComp?.yearBuilt ?? null,
          estimated: true,
        };

    const lead = await createLead({
      firstName,
      email,
      phone,
      address,
      latitude: body.latitude ?? null,
      longitude: body.longitude ?? null,
    });

    const report = await createReport({
      leadId: lead.id,
      estimatedValue: Math.round(valueEstimate.price),
      priceRangeLow: Math.round(valueEstimate.priceRangeLow),
      priceRangeHigh: Math.round(valueEstimate.priceRangeHigh),
      signalScore: signal.score,
      signalTier: signal.tier,
      signalLabel: signal.label,
      bedrooms: propertyDetails.bedrooms,
      bathrooms: propertyDetails.bathrooms,
      squareFootage: propertyDetails.squareFootage,
      yearBuilt: propertyDetails.yearBuilt,
      propertyDetailsEstimated: propertyDetails.estimated,
      comparables: valueEstimate.comparables,
      marketStats: marketStats?.saleData ?? null,
      isLatest: true,
    });

    // Generate + store the partial PDF first, so we have a report_url ready
    // to include in the GHL webhook payload.
    let partialPdfUrl: string | null = null;

    const confidencePct = estimateConfidence(
      valueEstimate.price,
      valueEstimate.priceRangeLow,
      valueEstimate.priceRangeHigh,
    );

    try {
      const bookingUrl = process.env.NEXT_PUBLIC_GHL_BOOKING_URL
        ? `${process.env.NEXT_PUBLIC_GHL_BOOKING_URL}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(firstName)}`
        : undefined;

      const pdfBuffer = await generatePartialReportPdf({
        address,
        estimatedValue: formatCurrencyForPdf(valueEstimate.price),
        rangeLow: formatCurrencyForPdf(valueEstimate.priceRangeLow),
        rangeHigh: formatCurrencyForPdf(valueEstimate.priceRangeHigh),
        confidenceLabel: formatConfidence(confidencePct),
        signalScore: signal.score,
        signalLabel: signal.label,
        signalMessage: messageForLabel(signal.label),
        bedrooms: propertyDetails.bedrooms ?? "N/A",
        bathrooms: propertyDetails.bathrooms ?? "N/A",
        squareFootage: propertyDetails.squareFootage
          ? `${propertyDetails.squareFootage.toLocaleString()} sq ft`
          : "N/A",
        yearBuilt: propertyDetails.yearBuilt ?? "N/A",
        detailsEstimated: propertyDetails.estimated,
        bookingUrl,
      });

      const fileUrl = await uploadPdf(`reports/${lead.id}-partial.pdf`, pdfBuffer);

      const pdfRecord = await savePdfRecord({
        leadId: lead.id,
        reportId: report.id,
        type: "partial",
        fileUrl,
      });

      partialPdfUrl = `${req.nextUrl.origin}/api/reports/download/${pdfRecord.id}`;

      await sendEmail({
        to: email,
        subject: "Your Home Value Report is Ready",
        html: partialReportEmailHtml({
          firstName,
          reportUrl: partialPdfUrl,
          address,
        }),
      });
    } catch (pdfError) {
      console.error("Partial PDF generation/email failed:", pdfError);
    }

    // Fire the GHL webhook — includes report_url so the client can open the
    // PDF directly from the GHL contact record. Never blocks the response.
    try {
      await sendLeadToGhl({
        leadId: lead.id,
        firstName,
        email,
        phone,
        address,
        estimatedValue: Math.round(valueEstimate.price),
        signalScore: signal.score,
        signalTier: signal.tier,
        reportUrl: partialPdfUrl,
      });
      await markGhlWebhookSent(lead.id);
    } catch (ghlError) {
      console.error("GHL webhook failed:", ghlError);
    }

    return NextResponse.json({
      leadId: lead.id,
      reportId: report.id,
      address,
      estimate: {
        price: valueEstimate.price,
        priceRangeLow: valueEstimate.priceRangeLow,
        priceRangeHigh: valueEstimate.priceRangeHigh,
      },
      subjectProperty: valueEstimate.subjectProperty,
      propertyDetails,
      comparables: valueEstimate.comparables,
      marketStats: marketStats?.saleData ?? null,
      signal,
    });
  } catch (error) {
    if (error instanceof RentcastApiError) {
      const friendlyMessage =
        error.status === 400
          ? "We couldn't find enough recent sales data for this address. Please try a different US address, or double-check the address is correct."
          : "We're having trouble reaching our data provider right now. Please try again in a moment.";

      return NextResponse.json(
        { error: friendlyMessage },
        { status: error.status === 401 ? 502 : error.status },
      );
    }

    console.error("property-report error:", error);
    return NextResponse.json(
      { error: "Failed to generate property report." },
      { status: 500 },
    );
  }
}