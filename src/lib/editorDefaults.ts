import { getLocalIsoDate } from "@/src/lib/dateUtils";
import { buildClientAddress } from "@/src/lib/invoiceCalculations";
import type { Client, InvoiceData, Profile, Tab } from "@/src/types/types";

/** Business details and invoice defaults from the user's profile. */
export function getProfileDefaults(profile: Profile, current: InvoiceData): Partial<InvoiceData> {
  return {
    businessName: profile.companyName ?? current.businessName,
    bussinessInfo: profile.businessInfo ?? current.bussinessInfo,
    logoDataUrl: profile.logoDataUrl ?? current.logoDataUrl,
    currency: profile.defaultCurrency || current.currency,
    taxRate: profile.defaultTaxRate,
    notes: profile.defaultNotes ?? "",
    terms: profile.defaultTerms ?? "",
    issueDate: getLocalIsoDate(),
    dueDate: getLocalIsoDate(profile.paymentTermsDays),
    status: "pending",
  };
}

export function getClientFields(client: Client): Partial<InvoiceData> {
  return { clientId: client.id, clientName: client.name, clientAddress: buildClientAddress(client) };
}

/** Mobile shows one tab at a time; desktop shows the preview beside the form when enabled. */
export function getPreviewVisibility(tab: Tab, showPreviewPanel: boolean): string {
  if (tab === "preview") return "block";
  return showPreviewPanel ? "hidden lg:block" : "hidden";
}
