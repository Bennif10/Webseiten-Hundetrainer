"use client";

import { Check } from "lucide-react";
import { Text } from "@/components/ui/Placeholder";
import { cn } from "@/lib/cn";
import type { TrainingService } from "@/types";

interface ServicePickerProps {
  services: TrainingService[];
  selected: string | null;
  onSelect: (id: string) => void;
  error?: string;
}

export function ServicePicker({ services, selected, onSelect, error }: ServicePickerProps) {
  return (
    <fieldset aria-describedby={error ? "service-error" : undefined}>
      <legend className="sr-only">Trainingsangebot wählen</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected = service.id === selected;
          return (
            <label
              key={service.id}
              className={cn(
                "relative flex cursor-pointer gap-3 rounded-2xl border p-4 transition-all duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage-700",
                isSelected
                  ? "border-sage-700 bg-sage-50 shadow-soft"
                  : "border-sage-900/12 bg-cream-50 hover:border-sage-500",
              )}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={isSelected}
                onChange={() => onSelect(service.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                  isSelected ? "border-sage-700 bg-sage-700 text-cream-50" : "border-sage-900/25",
                )}
              >
                {isSelected && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span className="text-sm leading-snug">
                <span className="block font-medium text-sage-900">
                  <Text>{service.title}</Text>
                </span>
                {(service.durationMinutes || service.price) && (
                  <span className="mt-1 block text-xs text-ink-muted">
                    {[service.durationMinutes && `${service.durationMinutes} Min.`, service.price]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id="service-error" className="mt-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
