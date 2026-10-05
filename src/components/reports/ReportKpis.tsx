import type { ReportKpisProps } from "@/src/types/types";

export default function ReportKpis({ items }: ReportKpisProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((kpi) => (
        <div key={kpi.label} className="panel p-5">
          <p className="eyebrow mb-2">{kpi.label}</p>
          <p className="truncate text-xl font-black tabular-nums text-navy sm:text-2xl">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}
