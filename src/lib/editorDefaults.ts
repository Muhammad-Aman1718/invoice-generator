import { getLocalIsoDate } from "@/src/lib/dateUtils";
import { buildClientAddress } from "@/src/lib/invoiceCalculations";
import type { Client, InvoiceData, NoteDefaults, Profile } from "@/src/types/types";

export function getNoteDefaults(profile: Profile): NoteDefaults {
  return {
    notes: profile.defaultNotes ?? "",
    terms: profile.defaultTerms ?? "",
    paymentDetails: profile.defaultPaymentDetails ?? "",
  };
}

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
    paymentDetails: profile.defaultPaymentDetails ?? "",
    issueDate: getLocalIsoDate(),
    dueDate: getLocalIsoDate(profile.paymentTermsDays),
    status: "pending",
  };
}

export function getClientFields(client: Client): Partial<InvoiceData> {
  return { clientId: client.id, clientName: client.name, clientAddress: buildClientAddress(client) };
}
