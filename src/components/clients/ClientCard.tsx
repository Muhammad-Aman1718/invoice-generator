import Link from "next/link";
import { FilePlus2, Mail, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { formatCurrency } from "@/src/lib/format";
import { ROUTES } from "@/src/constant/routes";
import { INITIALS_LENGTH } from "@/src/constant/app";
import type { ClientCardProps } from "@/src/types/types";

export default function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  return (
    <li className="panel flex flex-col p-5">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-black uppercase text-gold">
          {client.name.slice(0, INITIALS_LENGTH)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-black text-navy">{client.name}</h3>
          <p className="text-xs text-navy-500">
            {client.invoiceCount} invoice{client.invoiceCount === 1 ? "" : "s"}
            {client.invoiceCount > 0 && ` · ${formatCurrency(client.total, client.currency)}`}
          </p>
        </div>
      </div>
      <ul className="mb-4 flex-1 space-y-1.5 text-xs text-navy-500">
        {client.email && (
          <li className="flex items-center gap-2 truncate">
            <Mail size={12} className="flex-shrink-0" /> {client.email}
          </li>
        )}
        {client.phone && (
          <li className="flex items-center gap-2">
            <Phone size={12} className="flex-shrink-0" /> {client.phone}
          </li>
        )}
        {client.address && (
          <li className="flex items-start gap-2">
            <MapPin size={12} className="mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 whitespace-pre-line">{client.address}</span>
          </li>
        )}
      </ul>
      <div className="flex items-center gap-2 border-t border-navy/5 pt-3">
        <Link href={`${ROUTES.newInvoice}?client=${client.id}`} className="btn-outline btn-sm flex-1">
          <FilePlus2 size={13} /> Invoice
        </Link>
        <button
          className="btn-ghost btn-sm"
          onClick={() => onEdit(client)}
          aria-label={`Edit ${client.name}`}
        >
          <Pencil size={13} />
        </button>
        <button
          className="btn-ghost btn-sm text-red-600 hover:bg-red-50"
          onClick={() => onDelete(client)}
          aria-label={`Delete ${client.name}`}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </li>
  );
}
