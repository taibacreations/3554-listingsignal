/**
 * GoHighLevel (GHL) webhook integration.
 *
 * Sends lead data to a GHL "Inbound Webhook" trigger URL. GHL is a
 * one-way data receiver here — we push leads to it, we don't read from it.
 *
 * Requires GHL_WEBHOOK_URL in environment (.env.local).
 */

export interface GhlLeadPayload {
  leadId: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  estimatedValue: number;
  signalScore: number;
  signalTier: string;
}

export class GhlWebhookError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GhlWebhookError";
    this.status = status;
  }
}

export async function sendLeadToGhl(payload: GhlLeadPayload): Promise<void> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new GhlWebhookError("GHL_WEBHOOK_URL is missing from environment variables.");
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      internalLeadId: payload.leadId,
      firstName: payload.firstName,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      estimatedValue: payload.estimatedValue,
      signalScore: payload.signalScore,
      signalTier: payload.signalTier,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GhlWebhookError(`GHL webhook failed (${res.status}): ${body}`, res.status);
  }
}