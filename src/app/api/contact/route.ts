import { NextResponse } from "next/server";
import { withErrorHandling } from "@/src/lib/server/apiError";
import { parseRequestBody } from "@/src/lib/server/parseRequest";
import { contactSchema } from "@/src/lib/validation";
import { getSession, getSubscription } from "@/src/lib/server/auth";
import { getPlan } from "@/src/lib/plans";
import { SITE_CONFIG } from "@/src/constant/site";
import { PRIORITY_SUBJECT_PREFIX } from "@/src/constant/support";
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

/** Business-plan customers get priority support: their messages are tagged so they're answered first. */
async function hasPrioritySupport(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;
  return getPlan((await getSubscription(session)).plan).perks.prioritySupport;
}

// POST /api/contact — forwards to CONTACT_WEBHOOK_URL (Slack/Discord/Zapier) when set,
// otherwise returns a mailto link that the browser opens instead.
export const POST = withErrorHandling(async (request: Request) => {
  const input = await parseRequestBody(request, contactSchema);
  const isPriority = await hasPrioritySupport();
  const message = isPriority ? { ...input, subject: `${PRIORITY_SUBJECT_PREFIX} ${input.subject}` } : input;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: true, priority: isPriority, mailto: buildMailtoLink(message) });
  }

  await forwardToWebhook(webhookUrl, message);
  return NextResponse.json({ ok: true, priority: isPriority });
});
