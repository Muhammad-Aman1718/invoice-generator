import { formatCurrency, formatInvoiceDate } from "@/src/lib/format";
import { getDaysBetween, getLocalIsoDate } from "@/src/lib/dateUtils";
import type { PaymentReminderInput } from "@/src/types/types";

function describeDueDate(dueDate: string, today: string): string {
  if (!dueDate) return "is awaiting payment";
  const formatted = formatInvoiceDate(dueDate);
  if (dueDate >= today) return `is due on ${formatted}`;
  const days = getDaysBetween(dueDate, today);
  return `was due on ${formatted} (${days} day${days === 1 ? "" : "s"} ago)`;
}

/** A polite payment-reminder email (subject + body) ready to paste. */
export function buildPaymentReminder({
  invoice,
  senderName,
  today = getLocalIsoDate(),
}: PaymentReminderInput) {
  const amount = formatCurrency(invoice.totalAmount, invoice.currency);
  const greeting = invoice.clientName ? `Hi ${invoice.clientName},` : "Hello,";
  const signature = senderName || "Thanks";
  return [
    `Subject: Payment reminder — Invoice #${invoice.invoiceNumber} (${amount})`,
    "",
    greeting,
    "",
    `This is a friendly reminder that invoice #${invoice.invoiceNumber} for ${amount} ${describeDueDate(invoice.dueDate, today)}.`,
    "If you've already sent the payment, please ignore this message — and thank you!",
    "Otherwise, could you let me know when we can expect it?",
    "",
    "Kind regards,",
    signature,
  ].join("\n");
}
