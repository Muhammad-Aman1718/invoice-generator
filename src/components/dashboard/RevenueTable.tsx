import { formatCurrency } from "@/src/lib/format";
import type { RevenueTableProps } from "@/src/types/types";

export default function RevenueTable({ data, currency }: RevenueTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-navy/10 text-left text-[10px] font-black uppercase tracking-widest text-navy-500">
          <th className="py-2">Month</th>
          <th className="py-2 text-right">Invoiced</th>
          <th className="py-2 text-right">Paid</th>
        </tr>
      </thead>
      <tbody>
        {data.map((point) => (
          <tr key={point.label} className="border-b border-navy/5 text-navy">
            <td className="py-2 font-semibold">{point.label}</td>
            <td className="py-2 text-right tabular-nums">{formatCurrency(point.invoiced, currency)}</td>
            <td className="py-2 text-right tabular-nums">{formatCurrency(point.paid, currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
