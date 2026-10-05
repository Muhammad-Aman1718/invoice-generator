import { LogOut } from "lucide-react";
import type { SidebarUserProps } from "@/src/types/types";

export default function SidebarUser({ viewer, onLogout }: SidebarUserProps) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-black uppercase text-gold">
        {(viewer.name || viewer.email).slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-white">{viewer.name || "My account"}</p>
        <p className="truncate text-[11px] text-white/50">{viewer.email}</p>
      </div>
      <button
        onClick={onLogout}
        className="rounded-lg p-2 text-white/50 transition hover:bg-red-500/15 hover:text-red-300"
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut size={15} />
      </button>
    </div>
  );
}
