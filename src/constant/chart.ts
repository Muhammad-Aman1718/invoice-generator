// Palette validated with the dataviz validator (light surface). The gold step
// is below 3:1 against white, so charts also ship a tooltip and table view.
export const REVENUE_SERIES = [
  { key: "invoiced", label: "Invoiced", color: "#4646B4" },
  { key: "paid", label: "Paid", color: "#C98F00" },
] as const;

export const CHART_TICK_COUNT = 4;

export const CHART_NICE_STEPS = [1, 2, 2.5, 5, 10];
export const DEFAULT_CHART_MAX = 100;
