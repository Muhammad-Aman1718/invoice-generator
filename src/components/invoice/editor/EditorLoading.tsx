import { Loader2 } from "lucide-react";

export default function EditorLoading() {
  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col items-center justify-center gap-3 lg:h-[100dvh]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy">
        <Loader2 size={20} className="animate-spin text-gold" />
      </div>
      <p className="text-sm font-bold text-navy-500">Loading invoice…</p>
    </div>
  );
}
