import { PREVIEW_COLUMNS } from "@/src/constant/invoice";
import { cn } from "@/src/lib/utils";
import type { PreviewLineItemsProps } from "@/src/types/types";

export default function PreviewLineItems({ invoice, formatMoney }: PreviewLineItemsProps) {
  return (
    <div className="px-10 pt-6">
      <table className="w-full border-collapse text-[11.5px]">
        <thead>
          <tr className="border-b border-navy/15">
            {PREVIEW_COLUMNS.map((column) => (
              <th
                key={column.label}
                className={cn(
                  "px-2 pb-2 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-navy/45 first:pl-0 last:pr-0",
                  column.className,
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item, index) => (
            <tr key={item.id || index} className="avoid-break border-b border-navy/[0.07]">
              <td className="py-2.5 pr-2 align-top font-medium">{item.description || "-"}</td>
              <td className="px-2 py-2.5 text-center align-top text-navy/65">{item.quantity}</td>
              <td className="px-2 py-2.5 text-right align-top text-navy/65">{formatMoney(item.rate)}</td>
              <td className="px-2 py-2.5 text-center align-top text-navy/50">
                {item.discount ? `${item.discount}%` : "-"}
              </td>
              <td className="py-2.5 pl-2 text-right align-top font-semibold">{formatMoney(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
