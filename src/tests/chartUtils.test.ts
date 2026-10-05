import { describe, expect, it } from "vitest";
import { getChartTicks, getNiceMax } from "@/src/lib/chartUtils";
import { CHART_TICK_COUNT, DEFAULT_CHART_MAX } from "@/src/constant/chart";

describe("getNiceMax", () => {
  it("rounds up to a clean axis maximum", () => {
    expect(getNiceMax(6700)).toBe(8000);
    expect(getNiceMax(950)).toBe(1000);
    expect(getNiceMax(4)).toBe(4);
  });

  it("uses the default maximum for empty data", () => {
    expect(getNiceMax(0)).toBe(DEFAULT_CHART_MAX);
  });
});

describe("getChartTicks", () => {
  it("returns evenly spaced ticks from the top down to zero", () => {
    const ticks = getChartTicks(8000);
    expect(ticks).toHaveLength(CHART_TICK_COUNT + 1);
    expect(ticks).toEqual([8000, 6000, 4000, 2000, 0]);
  });
});
