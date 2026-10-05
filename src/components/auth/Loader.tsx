import { cn } from "@/src/lib/utils";
import type { LoaderProps } from "@/src/types/types";

export default function Loader({ className, text }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        role="status"
        aria-label="Loading"
        className={cn("h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-navy", className)}
      />
      {text && <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{text}</p>}
    </div>
  );
}
