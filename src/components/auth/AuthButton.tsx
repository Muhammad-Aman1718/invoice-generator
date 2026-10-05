import { Loader2 } from "lucide-react";
import type { AuthButtonProps } from "@/src/types/types";

export default function AuthButton({ isLoading = false, label }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="btn h-12 w-full bg-navy text-white shadow-lg shadow-navy/10 hover:bg-gold hover:text-navy"
    >
      {isLoading ? <Loader2 size={20} className="animate-spin" aria-label="Loading" /> : label}
    </button>
  );
}
