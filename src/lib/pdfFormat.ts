import { PDF_SAFE_SYMBOLS } from "@/src/constant/currencies";
import { formatAmount } from "@/src/lib/format";
import type { InvoiceData } from "@/src/types/types";

/** Money formatter using the symbol when the PDF font supports it, else the ISO code. */
export function createPdfMoneyFormatter(invoice: Pick<InvoiceData, "currency" | "currencySymbol">) {
  const symbol =
    invoice.currencySymbol && PDF_SAFE_SYMBOLS.includes(invoice.currencySymbol)
      ? invoice.currencySymbol
      : invoice.currency;
  return (amount: number) => `${symbol} ${formatAmount(amount)}`;
}
