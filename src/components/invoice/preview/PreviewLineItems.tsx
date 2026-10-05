import { PREVIEW_COLUMNS } from "@/src/constant/invoice";
import type { PreviewLineItemsProps } from "@/src/types/types";

export default function PreviewLineItems({ invoice, formatMoney }: PreviewLineItemsProps) {
  return (
    <div className="px-9 pt-4">
      <table className="w-full border-collapse text-[10.5px]">
        <thead>
          <tr className="border-b-[1.5px] border-navy">
            {PREVIEW_COLUMNS.map((column) => (
              <th
                key={column.label}
                className={`px-1 pb-[5px] pt-[3px] text-[7.5px] font-black uppercase tracking-[0.1em] text-navy/45 ${column.className}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item, index) => (
            <tr
              key={item.id || index}
              className={`avoid-break border-b border-navy/[0.08] ${index % 2 ? "bg-navy/[0.02]" : ""}`}
            >
              <td className="py-[5px] pr-1 align-top font-medium">{item.description || "—"}</td>
              <td className="px-1 py-[5px] text-center align-top font-mono text-navy/60">{item.quantity}</td>
              <td className="px-1 py-[5px] text-right align-top font-mono text-navy/60">
                {formatMoney(item.rate)}
              </td>
              <td className="px-1 py-[5px] text-center align-top font-mono text-navy/50">
                {item.discount ? `${item.discount}%` : "—"}
              </td>
              <td className="py-[5px] pl-1 text-right align-top font-mono font-bold">
                {formatMoney(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
