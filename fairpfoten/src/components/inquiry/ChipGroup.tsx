"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface ChipGroupProps {
  legend: string;
  name: string;
  options: string[];
  /** Mehrfachauswahl (Checkboxen) oder Einzelauswahl (Radio-Buttons). */
  multiple?: boolean;
  selected: string[];
  onChange: (selected: string[]) => void;
}

/** Auswahl-Chips auf Basis nativer Checkboxen/Radio-Buttons (tastaturbedienbar). */
export function ChipGroup({ legend, name, options, multiple = true, selected, onChange }: ChipGroupProps) {
  function toggle(option: string) {
    if (!multiple) return onChange(selected.includes(option) ? [] : [option]);
    onChange(selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option]);
  }

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-sage-900">
        {legend}
        {multiple && <span className="ml-2 text-xs font-normal text-ink-muted">Mehrfachauswahl möglich</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm transition-all duration-200 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage-700",
                isSelected
                  ? "border-sage-700 bg-sage-700 text-cream-50 shadow-soft"
                  : "border-sage-900/15 bg-cream-50 text-sage-900 hover:border-sage-500",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option}
                checked={isSelected}
                onChange={() => toggle(option)}
                // Radio-Buttons lassen sich per Klick sonst nicht abwählen
                onClick={!multiple && isSelected ? () => toggle(option) : undefined}
                className="sr-only"
              />
              {isSelected && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
