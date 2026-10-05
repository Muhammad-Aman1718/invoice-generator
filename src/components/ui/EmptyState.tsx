import type { EmptyStateProps } from "@/src/types/types";

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
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
