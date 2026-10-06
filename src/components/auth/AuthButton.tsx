import { Loader2 } from "lucide-react";
import type { AuthButtonProps } from "@/src/types/types";

export default function AuthButton({ isLoading = false, label }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="btn h-12 w-full bg-navy text-white shadow-sm hover:bg-navy-600"
    >
      {isLoading ? <Loader2 size={20} className="animate-spin" aria-label="Loading" /> : label}
    </button>
  );
}
