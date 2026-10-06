import { formatCurrency } from "@/src/lib/format";
import type { TopClientsCardProps } from "@/src/types/types";

export default function TopClientsCard({ clients, currency }: TopClientsCardProps) {
  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="topClientsTitle">
      <h2 id="topClientsTitle" className="mb-4 text-base font-bold text-navy">
        Top clients
      </h2>
      <ul className="space-y-3">
        {clients.map((client, index) => (
          <li key={client.name} className="flex items-center gap-3">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-mist text-xs font-bold text-navy">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-navy">{client.name}</p>
              <p className="text-xs text-navy-500">{client.count} invoices</p>
            </div>
            <span className="text-sm font-bold tabular-nums text-navy">
              {formatCurrency(client.total, currency)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
