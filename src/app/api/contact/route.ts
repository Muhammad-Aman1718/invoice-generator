import { NextResponse } from "next/server";
import { withErrorHandling } from "@/src/lib/server/apiError";
import { parseRequestBody } from "@/src/lib/server/parseRequest";
import { contactSchema } from "@/src/lib/validation";
import { SITE_CONFIG } from "@/src/constant/site";
import type { ContactMessage } from "@/src/types/types";

async function forwardToWebhook(webhookUrl: string, message: ContactMessage) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New contact message from ${message.name} <${message.email}>\nSubject: ${message.subject}\n\n${message.message}`,
      ...message,
    }),
  });
  if (!response.ok) throw new Error(`Contact webhook failed (${response.status})`);
}

function buildMailtoLink(message: ContactMessage): string {
  const subject = encodeURIComponent(message.subject);
  const body = encodeURIComponent(`${message.message}\n\n— ${message.name} (${message.email})`);
  return `mailto:${SITE_CONFIG.supportEmail}?subject=${subject}&body=${body}`;
}

// POST /api/contact — forwards to CONTACT_WEBHOOK_URL (Slack/Discord/Zapier) when set,
// otherwise returns a mailto link that the browser opens instead.
export const POST = withErrorHandling(async (request: Request) => {
  const message = await parseRequestBody(request, contactSchema);
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ ok: true, mailto: buildMailtoLink(message) });

  await forwardToWebhook(webhookUrl, message);
  return NextResponse.json({ ok: true });
});
