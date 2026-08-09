/**
 * Minimal Resend transport over fetch — no SDK dependency.
 *
 * Set these in the environment to turn delivery on:
 *   RESEND_API_KEY   — API key from resend.com
 *   MAIL_FROM        — verified sender, e.g. "Website <site@laurettaogbum.com>"
 *   MAIL_TO          — practice inbox that receives enquiries
 *
 * Until they are set, `deliver` reports `configured: false` and the calling
 * server action falls back to telling the visitor to email or WhatsApp directly.
 * Nothing is silently dropped.
 */

export interface DeliveryResult {
  configured: boolean;
  delivered: boolean;
  error?: string;
}

interface Mail {
  subject: string;
  text: string;
  replyTo?: string;
}

export async function deliver({ subject, text, replyTo }: Mail): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!apiKey || !from || !to) {
    return { configured: false, delivered: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend delivery failed", response.status, detail);
      return { configured: true, delivered: false, error: `Mail provider returned ${response.status}` };
    }

    return { configured: true, delivered: true };
  } catch (error) {
    console.error("Resend request threw", error);
    return { configured: true, delivered: false, error: "Could not reach the mail provider" };
  }
}
