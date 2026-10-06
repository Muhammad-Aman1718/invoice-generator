import RefreshButton from "@/src/components/dashboard/RefreshButton";
import type { PageHeaderProps } from "@/src/types/types";

export default function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
  refreshable,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 motion-safe:animate-fade-up sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy">
            <Icon size={18} className="text-gold" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold text-navy sm:text-2xl">{title}</h1>
          {description && <p className="text-sm text-navy-500">{description}</p>}
        </div>
      </div>
      {(actions || refreshable) && (
        <div className="flex flex-wrap items-center gap-2">
          {refreshable && <RefreshButton />}
          {actions}
        </div>
      )}
    </header>
  );
}
