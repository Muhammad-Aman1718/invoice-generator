import { Suspense } from "react";
import InvoiceEditor from "@/src/components/invoice/editor/InvoiceEditor";
import { getViewer, listClients } from "@/src/lib/server/data";
import type { EditInvoicePageProps } from "@/src/types/types";

export const metadata = { title: "Edit invoice" };

export default async function EditInvoicePage({ params }: EditInvoicePageProps) {
  const { id } = await params;
  const viewer = await getViewer();
  const clients = await listClients(viewer);
  return (
    <Suspense>
      <InvoiceEditor
        key={id}
        mode="edit"
        invoiceId={id}
        clients={clients}
        profile={viewer.profile}
        pdfBranding={!viewer.plan.perks.removeBranding}
      />
    </Suspense>
  );
}
