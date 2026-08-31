import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pdfs } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ pdfId: string }> }) {
  const { pdfId } = await params;

  const record = await db.query.pdfs.findFirst({ where: eq(pdfs.id, pdfId) });

  if (!record) {
    return NextResponse.json({ error: "Report not found." }, { status: 404 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Storage not configured." }, { status: 500 });
  }

  const blobRes = await fetch(record.fileUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!blobRes.ok || !blobRes.body) {
    return NextResponse.json({ error: "Could not retrieve the report file." }, { status: 502 });
  }

  return new NextResponse(blobRes.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="listing-signal-report.pdf"`,
    },
  });
}