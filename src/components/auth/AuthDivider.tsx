import type { AuthDividerProps } from "@/src/types/types";

export default function AuthDivider({ text }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 border-t border-navy/10" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-navy/80">{text}</span>
      <div className="flex-1 border-t border-navy/10" />
    </div>
  );
}
