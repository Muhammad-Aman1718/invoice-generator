import { MS_PER_DAY } from "@/src/constant/app";

/** Today (plus `offsetDays`) as YYYY-MM-DD in the user's local timezone. */
export function getLocalIsoDate(offsetDays = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const tzOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - tzOffsetMs).toISOString().slice(0, 10);
}

/** Today (plus `offsetDays`) as YYYY-MM-DD in UTC (server side). */
export function getUtcIsoDate(offsetDays = 0): string {
  return new Date(Date.now() + offsetDays * MS_PER_DAY).toISOString().slice(0, 10);
}

/** Whole days from `from` to `to` (YYYY-MM-DD), never negative. */
export function getDaysBetween(from: string, to: string): number {
  const diff = new Date(to).getTime() - new Date(from).getTime();
  return Number.isNaN(diff) ? 0 : Math.max(0, Math.round(diff / MS_PER_DAY));
}

/** First instant of the current month in UTC — monthly plan limits reset here. */
export function getUtcMonthStart(): Date {
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  return start;
}

export function getDaysFromNowIso(days: number): string {
  return new Date(Date.now() + days * MS_PER_DAY).toISOString();
}
