import { formatCurrency } from "@/src/lib/format";
import type { TopClientsTableProps } from "@/src/types/types";

export default function TopClientsTable({ clients, currency }: TopClientsTableProps) {
  return (
    <section className="panel overflow-hidden" aria-labelledby="topClientsTableTitle">
      <h2 id="topClientsTableTitle" className="px-5 pb-3 pt-5 text-base font-black text-navy sm:px-6">
        Top clients
      </h2>
      {clients.length === 0 ? (
        <p className="px-6 pb-6 text-sm text-navy-500">No billable invoices in this range.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-navy/5 bg-navy/[0.02] text-[10px] font-black uppercase tracking-widest text-navy-500">
              <th className="px-5 py-2 text-left sm:px-6">Client</th>
              <th className="px-3 py-2 text-right">Invoices</th>
              <th className="px-5 py-2 text-right sm:px-6">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {clients.map((client) => (
              <tr key={client.name}>
                <td className="max-w-[160px] truncate px-5 py-2.5 font-semibold text-navy sm:px-6">
                  {client.name}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-navy-500">{client.count}</td>
                <td className="px-5 py-2.5 text-right font-black tabular-nums text-navy sm:px-6">
                  {formatCurrency(client.total, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
