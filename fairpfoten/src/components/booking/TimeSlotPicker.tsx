"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import { addMinutes } from "@/lib/dates";
import type { TimeOfDay, TimeSlot } from "@/types";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selected: TimeOfDay | null;
  onSelect: (time: TimeOfDay) => void;
  durationMinutes: number;
  error?: string;
}

const statusLabel: Record<TimeSlot["status"], string> = {
  available: "frei",
  booked: "belegt",
  past: "nicht mehr verfügbar",
};

/** Zeitfenster als native Radio-Buttons (Pfeiltasten-Navigation inklusive). */
export function TimeSlotPicker({ slots, selected, onSelect, durationMinutes, error }: TimeSlotPickerProps) {
  return (
    <fieldset aria-describedby={error ? "slot-error" : undefined}>
      <legend className="sr-only">Uhrzeit wählen</legend>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-2.5">
        {slots.map((slot) => {
          const available = slot.status === "available";
          const isSelected = slot.time === selected;
          return (
            <label
              key={slot.time}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center rounded-2xl border px-3 py-2 transition-all duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage-700",
                isSelected
                  ? "border-sage-700 bg-sage-700 text-cream-50 shadow-soft"
                  : available
                    ? "cursor-pointer border-sage-900/12 bg-cream-50 text-sage-900 hover:-translate-y-0.5 hover:border-sage-600 hover:shadow-soft"
                    : "cursor-not-allowed border-dashed border-sage-900/10 text-ink-muted/60",
              )}
            >
              <input
                type="radio"
                name="slot"
                value={slot.time}
                checked={isSelected}
                disabled={!available}
                onChange={() => onSelect(slot.time)}
                className="sr-only"
              />
              <span className={cn("flex items-center gap-1.5 font-medium", !available && "line-through")}>
                <Clock className="size-3.5" aria-hidden />
                {slot.time} Uhr
              </span>
              <span className={cn("text-xs", isSelected ? "text-sage-100" : "text-ink-muted")}>
                {available ? `bis ${addMinutes(slot.time, durationMinutes)} Uhr` : statusLabel[slot.status]}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id="slot-error" className="mt-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
