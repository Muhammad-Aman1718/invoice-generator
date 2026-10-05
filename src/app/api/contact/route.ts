import { NextResponse } from "next/server";
import { siteConfig } from "@/src/config/site";
import { ApiError, handle, readJson } from "@/src/lib/server/auth";
import { contactSchema, firstIssue } from "@/src/lib/validation";

// POST /api/contact — forwards to CONTACT_WEBHOOK_URL (Slack/Discord/Zapier/etc.)
// when set; otherwise returns a mailto link the browser opens instead.
export const POST = handle(async (request: Request) => {
  const parsed = contactSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));
  const { name, email, subject, message } = parsed.data;

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New contact message from ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
        name,
        email,
        subject,
        message,
      }),
    });
    if (!res.ok) throw new Error(`Contact webhook failed (${res.status})`);
    return NextResponse.json({ ok: true });
  }

  const mailto = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
  return NextResponse.json({ ok: true, mailto });
});
