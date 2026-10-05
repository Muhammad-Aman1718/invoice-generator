import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy">
            <Icon size={18} className="text-gold" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-black text-navy sm:text-2xl">{title}</h1>
          {description && <p className="text-sm font-medium text-navy-500">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy/10 bg-white p-10 text-center sm:p-16">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mist">
        <Icon size={24} className="text-navy-400" aria-hidden="true" />
      </div>
      <h3 className="mb-1 text-base font-black text-navy">{title}</h3>
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-navy-500">{description}</p>
      {action}
    </div>
  );
}
