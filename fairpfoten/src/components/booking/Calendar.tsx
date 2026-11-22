"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  WEEKDAY_LONG,
  WEEKDAY_SHORT,
  compareMonths,
  formatLongDate,
  formatMonth,
  getMonthGrid,
  monthOf,
  shiftMonth,
  type MonthRef,
} from "@/lib/dates";
import type { ISODate } from "@/types";

interface CalendarProps {
  month: MonthRef;
  onMonthChange: (month: MonthRef) => void;
  today: ISODate;
  lastBookable: ISODate;
  selected: ISODate | null;
  onSelect: (date: ISODate) => void;
  /** Anzahl freier Zeitfenster pro Tag */
  freeSlotsOn: (date: ISODate) => number;
}

export function Calendar({
  month,
  onMonthChange,
  today,
  lastBookable,
  selected,
  onSelect,
  freeSlotsOn,
}: CalendarProps) {
  const weeks = getMonthGrid(month);
  const canGoBack = compareMonths(month, monthOf(today)) > 0;
  const canGoForward = compareMonths(month, monthOf(lastBookable)) < 0;
  const label = formatMonth(month);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(month, -1))}
          disabled={!canGoBack}
          aria-label="Vorheriger Monat"
          className="grid size-11 place-items-center rounded-full text-sage-800 transition-colors hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <h3 className="font-serif text-2xl capitalize" aria-live="polite">
          {label}
        </h3>
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(month, 1))}
          disabled={!canGoForward}
          aria-label="Nächster Monat"
          className="grid size-11 place-items-center rounded-full text-sage-800 transition-colors hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <table className="w-full table-fixed border-separate border-spacing-1">
        <caption className="sr-only">Kalender {label} – Tage mit freien Terminen sind auswählbar</caption>
        <thead>
          <tr>
            {WEEKDAY_SHORT.map((d, i) => (
              <th key={d} scope="col" className="pb-2 text-xs font-medium text-ink-muted">
                <abbr title={WEEKDAY_LONG[i]} className="no-underline">
                  {d}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((date, di) => {
                if (!date) return <td key={di} />;
                const inRange = date >= today && date <= lastBookable;
                const free = inRange ? freeSlotsOn(date) : 0;
                const enabled = free > 0;
                const isSelected = date === selected;
                const isToday = date === today;
                const day = Number(date.slice(-2));
                const status = !inRange
                  ? "nicht buchbar"
                  : enabled
                    ? `${free} ${free === 1 ? "freier Termin" : "freie Termine"}`
                    : "keine freien Termine";

                return (
                  <td key={date} className="p-0 text-center">
                    <button
                      type="button"
                      disabled={!enabled}
                      onClick={() => onSelect(date)}
                      aria-pressed={isSelected}
                      aria-label={`${formatLongDate(date)}, ${status}`}
                      className={cn(
                        "relative mx-auto flex aspect-square w-full max-w-12 flex-col items-center justify-center rounded-2xl text-[0.95rem] transition-all duration-200",
                        isSelected
                          ? "bg-sage-700 font-semibold text-cream-50 shadow-soft"
                          : enabled
                            ? "bg-sage-50 font-medium text-sage-900 hover:bg-sage-200"
                            : "cursor-not-allowed text-ink-muted/45",
                        isToday && !isSelected && "ring-1 ring-bark-300",
                      )}
                    >
                      {day}
                      {enabled && (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute bottom-1.5 size-1 rounded-full",
                            isSelected ? "bg-cream-50" : "bg-sage-600",
                          )}
                        />
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-muted" aria-label="Legende">
        <li className="flex items-center gap-2">
          <span className="size-3 rounded bg-sage-50 ring-1 ring-sage-200" aria-hidden /> freie Termine
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded bg-sage-700" aria-hidden /> ausgewählt
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded ring-1 ring-bark-300" aria-hidden /> heute
        </li>
      </ul>
    </div>
  );
}
