import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { getValueEstimate, getMarketStatistics } from "@/lib/rentcast";
import { calculateSignalScore } from "@/lib/signal-score";
import { createReport } from "@/lib/leads";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min — looping many leads + external API calls takes time

function verifyCronSecret(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

function marketUpdateEmailHtml(input: {
  firstName: string;
  address: string;
  previousScore: number;
  newScore: number;
  newValue: string;
  reportUrl: string;
}): string {
  const trend = input.newScore > input.previousScore ? "up" : input.newScore < input.previousScore ? "down" : "steady";
  const trendText =
    trend === "up"
      ? `Your Signal Score has gone up ${input.newScore - input.previousScore} points since your last report.`
      : trend === "down"
        ? `Your Signal Score has shifted since your last report — worth a look.`
        : `Your Signal Score is holding steady.`;

  return `
<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /></head>
  <body style="margin:0; padding:0; background-color:#F3F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F5F7; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color:#ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(11,30,51,0.08);">
            <tr>
              <td style="background-color:#0B1E33; padding: 28px 32px;">
                <span style="color:#1FAE9F; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Monthly Market Update</span>
                <h1 style="color:#ffffff; font-size:22px; font-weight:700; margin: 14px 0 0 0; line-height:1.3;">
                  Hi ${input.firstName}, here's what changed.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <p style="color:#374151; font-size:14px; line-height:1.6; margin: 0 0 4px 0;">Updated numbers for:</p>
                <p style="color:#0B1E33; font-size:15px; font-weight:700; margin: 0 0 20px 0;">${input.address}</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                  <tr>
                    <td style="background-color:#F7F9FA; border-radius: 10px; border: 1px solid #E5E7EB; padding: 16px; width: 48%;">
                      <p style="color:#6B7280; font-size:10px; text-transform:uppercase; margin:0 0 4px 0;">New Estimated Value</p>
                      <p style="color:#0B1E33; font-size:20px; font-weight:700; margin:0;">${input.newValue}</p>
                    </td>
                    <td style="width:4%;"></td>
                    <td style="background-color:#EAF6F4; border-radius: 10px; padding: 16px; width: 48%;">
                      <p style="color:#178F82; font-size:10px; text-transform:uppercase; margin:0 0 4px 0;">Signal Score</p>
                      <p style="color:#0E8F82; font-size:20px; font-weight:700; margin:0;">${input.newScore}/100</p>
                    </td>
                  </tr>
                </table>
                <p style="color:#374151; font-size:13px; line-height:1.6; margin: 0 0 24px 0;">${trendText}</p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#1FAE9F; border-radius: 10px;">
                      <a href="${input.reportUrl}" target="_blank" style="display:inline-block; padding: 14px 28px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none;">
                        View Updated Report
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 32px; border-top: 1px solid #E5E7EB;">
                <p style="color:#9CA3AF; font-size:11px; line-height:1.6; margin: 0; text-align:center;">
                  This automated update is for informational purposes only and is not a formal appraisal.<br />
                  © ${new Date().getFullYear()} Listing Signal
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allLeads = await db.query.leads.findMany({
    with: { reports: { orderBy: (r, { desc }) => [desc(r.createdAt)], limit: 1 } },
  });

  const results: Array<{ leadId: string; status: "success" | "failed"; error?: string }> = [];

  for (const lead of allLeads) {
    const previousReport = lead.reports?.[0];
    if (!previousReport) continue;

    try {
      const valueEstimate = await getValueEstimate(lead.address, { compCount: 20 });
      const zipCode = valueEstimate.subjectProperty?.zipCode;
      const marketStats = zipCode ? await getMarketStatistics(zipCode) : null;

      const signal = calculateSignalScore({
        subjectPrice: valueEstimate.price,
        subjectBedrooms: valueEstimate.subjectProperty?.bedrooms,
        saleData: marketStats?.saleData,
      });

      const newReport = await createReport({
        leadId: lead.id,
        estimatedValue: Math.round(valueEstimate.price),
        priceRangeLow: Math.round(valueEstimate.priceRangeLow),
        priceRangeHigh: Math.round(valueEstimate.priceRangeHigh),
        signalScore: signal.score,
        signalTier: signal.tier,
        signalLabel: signal.label,
        bedrooms: previousReport.bedrooms,
        bathrooms: previousReport.bathrooms,
        squareFootage: previousReport.squareFootage,
        yearBuilt: previousReport.yearBuilt,
        propertyDetailsEstimated: previousReport.propertyDetailsEstimated,
        comparables: valueEstimate.comparables,
        marketStats: marketStats?.saleData ?? null,
        isLatest: true,
      });

      await sendEmail({
        to: lead.email,
        subject: "Your Monthly Market Update",
        html: marketUpdateEmailHtml({
          firstName: lead.firstName,
          address: lead.address,
          previousScore: previousReport.signalScore,
          newScore: signal.score,
          newValue: `$${Math.round(valueEstimate.price).toLocaleString()}`,
          reportUrl: `${req.nextUrl.origin}/?leadId=${lead.id}`,
        }),
      });

      await db.insert((await import("@/db/schema")).marketUpdateLogs).values({
        leadId: lead.id,
        previousScore: previousReport.signalScore,
        newScore: signal.score,
        status: "success",
      });

      results.push({ leadId: lead.id, status: "success" });
    } catch (error) {
      console.error(`Market update failed for lead ${lead.id}:`, error);

      await db.insert((await import("@/db/schema")).marketUpdateLogs).values({
        leadId: lead.id,
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });

      results.push({
        leadId: lead.id,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}