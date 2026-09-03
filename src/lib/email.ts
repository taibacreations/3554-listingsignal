/**
 * Email sending — currently a STUB.
 *
 * Once the SendGrid API key is available, replace the body of sendEmail()
 * with an actual SendGrid API call. Everything that calls sendEmail()
 * elsewhere in the app does not need to change.
 */

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  attachmentUrl?: string; // link-based delivery, not a raw attachment
}

export async function sendEmail(input: SendEmailInput): Promise<{ sent: boolean }> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.warn(
      `[email stub] SENDGRID_API_KEY or SENDGRID_FROM_EMAIL not set — would have sent email to ${input.to}: "${input.subject}"`,
    );
    return { sent: false };
  }

  const sgMail = (await import("@sendgrid/mail")).default;
  sgMail.setApiKey(apiKey);

  try {
    await sgMail.send({
      to: input.to,
      from: { email: fromEmail, name: "Listing Signal" },
      subject: input.subject,
      html: input.html,
    });
    return { sent: true };
  } catch (error) {
    console.error("SendGrid send failed:", error);
    return { sent: false };
  }
}

export function partialReportEmailHtml(input: { firstName: string; reportUrl: string; address: string }): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0; padding:0; background-color:#F3F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F5F7; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color:#ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(11,30,51,0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:#0B1E33; padding: 28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:#1FAE9F; margin-right:8px; vertical-align:middle;"></span>
                      <span style="color:#1FAE9F; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; vertical-align:middle;">Your Home Value Is Ready</span>
                    </td>
                  </tr>
                </table>
                <h1 style="color:#ffffff; font-size:22px; font-weight:700; margin: 14px 0 0 0; line-height:1.3;">
                  Hi ${input.firstName}, your report is ready.
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px;">
                <p style="color:#374151; font-size:14px; line-height:1.6; margin: 0 0 4px 0;">
                  We've put together your Listing Signal™ report for:
                </p>
                <p style="color:#0B1E33; font-size:15px; font-weight:700; margin: 0 0 24px 0;">
                  ${input.address}
                </p>

                <!-- CTA button -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
                  <tr>
                    <td style="background-color:#1FAE9F; border-radius: 10px;">
                      <a href="${input.reportUrl}" target="_blank" style="display:inline-block; padding: 14px 28px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none;">
                        View Your Report (PDF)
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Info box -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F9FA; border-radius: 10px; border: 1px solid #E5E7EB;">
                  <tr>
                    <td style="padding: 18px 20px;">
                      <p style="color:#0B1E33; font-size:13px; font-weight:700; margin: 0 0 6px 0;">
                        Want the full picture?
                      </p>
                      <p style="color:#6B7280; font-size:13px; line-height:1.5; margin: 0;">
                        Comparable sales, neighborhood pricing trends, and a personalized pricing strategy are unlocked with a free, no-obligation home visit.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 32px; border-top: 1px solid #E5E7EB;">
                <p style="color:#9CA3AF; font-size:11px; line-height:1.6; margin: 0; text-align:center;">
                  This automated report is for informational purposes only and is not a formal appraisal.<br />
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




export function fullReportEmailHtml(input: { firstName: string; reportUrl: string; address: string }): string {
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
                <span style="color:#1FAE9F; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Full Report Unlocked</span>
                <h1 style="color:#ffffff; font-size:22px; font-weight:700; margin: 14px 0 0 0; line-height:1.3;">
                  Thanks for booking, ${input.firstName}!
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <p style="color:#374151; font-size:14px; line-height:1.6; margin: 0 0 4px 0;">
                  Your full Listing Signal™ report — including comparable sales and neighborhood pricing trends — is ready for:
                </p>
                <p style="color:#0B1E33; font-size:15px; font-weight:700; margin: 0 0 24px 0;">
                  ${input.address}
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#1FAE9F; border-radius: 10px;">
                      <a href="${input.reportUrl}" target="_blank" style="display:inline-block; padding: 14px 28px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none;">
                        View Your Full Report (PDF)
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="color:#6B7280; font-size:13px; line-height:1.6; margin: 24px 0 0 0;">
                  We look forward to seeing you at your home visit. If you have any questions before then, just reply to this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 32px; border-top: 1px solid #E5E7EB;">
                <p style="color:#9CA3AF; font-size:11px; line-height:1.6; margin: 0; text-align:center;">
                  This automated report is for informational purposes only and is not a formal appraisal.<br />
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