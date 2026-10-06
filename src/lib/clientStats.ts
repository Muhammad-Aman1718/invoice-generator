import type { Client, ClientFormValues, ClientWithStats, InvoiceSummary } from "@/src/types/types";

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

/** Invoices linked by client id, or (for older invoices) by matching name. */
function belongsToClient(invoice: InvoiceSummary, client: Client): boolean {
  if (invoice.status === "cancelled") return false;
  if (invoice.clientId) return invoice.clientId === client.id;
  return normalizeName(invoice.clientName) === normalizeName(client.name);
}

/** The invoices that belong to one client (cancelled ones excluded). */
export function filterClientInvoices(invoices: InvoiceSummary[], client: Client): InvoiceSummary[] {
  return invoices.filter((invoice) => belongsToClient(invoice, client));
}

export function attachClientStats(
  clients: Client[],
  invoices: InvoiceSummary[],
  fallbackCurrency: string,
): ClientWithStats[] {
  return clients.map((client) => {
    const clientInvoices = filterClientInvoices(invoices, client);
    return {
      ...client,
      invoiceCount: clientInvoices.length,
      total: clientInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
      currency: clientInvoices[0]?.currency ?? fallbackCurrency,
    };
  });
}

export function toClientFormValues(client: Client | null): ClientFormValues {
  return {
    name: client?.name ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    address: client?.address ?? "",
    taxId: client?.taxId ?? "",
    notes: client?.notes ?? "",
  };
}

export function filterClients<T extends Client>(clients: T[], query: string): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return clients;
  return clients.filter((client) =>
    [client.name, client.email, client.phone, client.address].some((value) =>
      value?.toLowerCase().includes(needle),
    ),
  );
}
