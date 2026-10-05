import { Suspense } from "react";
import InvoiceEditor from "@/src/components/invoice/editor/InvoiceEditor";
import { getViewer, listClients } from "@/src/lib/server/data";

export const metadata = { title: "New invoice" };

export default async function NewInvoicePage() {
  const viewer = await getViewer();
  const clients = await listClients(viewer);
  return (
    <Suspense>
      <InvoiceEditor
        mode="new"
        clients={clients}
        profile={viewer.profile}
        pdfBranding={!viewer.plan.perks.removeBranding}
      />
    </Suspense>
  );
}
