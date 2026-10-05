import { CHART_NICE_STEPS, CHART_TICK_COUNT, DEFAULT_CHART_MAX } from "@/src/constant/chart";

/** Round a maximum up so the y-axis gets clean tick values (e.g. 6,700 → 8,000). */
export function getNiceMax(value: number): number {
  if (value <= 0) return DEFAULT_CHART_MAX;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = CHART_NICE_STEPS.find((s) => s * magnitude * CHART_TICK_COUNT >= value) ?? 10;
  return step * magnitude * CHART_TICK_COUNT;
}

/** Tick values from the top of the axis down to zero. */
export function getChartTicks(max: number): number[] {
  return Array.from({ length: CHART_TICK_COUNT + 1 }, (_, i) => (max / CHART_TICK_COUNT) * i).reverse();
}
