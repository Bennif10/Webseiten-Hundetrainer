import type { ISODate } from "@/types";

const pad = (n: number) => String(n).padStart(2, "0");

/** Date → "YYYY-MM-DD" in lokaler Zeit. */
export function toISODate(date: Date): ISODate {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "YYYY-MM-DD" (+ optional "HH:MM") → Date in lokaler Zeit. */
export function fromISODate(iso: ISODate, time = "00:00"): Date {
  const [y, m, d] = iso.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return new Date(y, m - 1, d, h, min);
}

export function addDays(iso: ISODate, days: number): ISODate {
  const d = fromISODate(iso);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export interface MonthRef {
  year: number;
  /** 0 = Januar … 11 = Dezember */
  month: number;
}

export function monthOf(iso: ISODate): MonthRef {
  const d = fromISODate(iso);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export function shiftMonth({ year, month }: MonthRef, delta: number): MonthRef {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export function compareMonths(a: MonthRef, b: MonthRef): number {
  return a.year * 12 + a.month - (b.year * 12 + b.month);
}

/**
 * Liefert die Tage eines Monats als Wochenraster (Montag zuerst).
 * Leere Zellen am Anfang/Ende sind `null`.
 */
export function getMonthGrid({ year, month }: MonthRef): (ISODate | null)[][] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7; // Montag = 0

  const cells: (ISODate | null)[] = Array.from({ length: leading }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(toISODate(new Date(year, month, day)));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (ISODate | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const LOCALE = "de-DE";

export const formatMonth = ({ year, month }: MonthRef) =>
  new Intl.DateTimeFormat(LOCALE, { month: "long", year: "numeric" }).format(new Date(year, month, 1));

export const formatLongDate = (iso: ISODate) =>
  new Intl.DateTimeFormat(LOCALE, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fromISODate(iso));

export const WEEKDAY_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;
export const WEEKDAY_LONG = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
] as const;

/** Endzeit eines Slots ("09:00" + 60 → "10:00"). */
export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
}
