import { COUNTER_VISIBLE_RATIO } from "@/src/constant/limits";
import { cn } from "@/src/lib/utils";
import type { CharacterCountProps } from "@/src/types/types";

/** "n / max" helper; appears near the limit unless always visible. */
export default function CharacterCount({ id, length, max, alwaysVisible }: CharacterCountProps) {
  if (!alwaysVisible && length < max * COUNTER_VISIBLE_RATIO) return null;
  return (
    <p
      id={`${id}Count`}
      className={cn("text-xs tabular-nums", length >= max ? "font-semibold text-red-700" : "text-navy-500")}
    >
      {length} / {max}
    </p>
  );
}
