"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { ratingLabels } from "@/config/feedback";
import { cn } from "@/lib/cn";

interface StarInputProps {
  name: string;
  label: string;
  question: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

/**
 * Sternebewertung 1–5 als native Radio-Buttons:
 * per Maus, Touch und Tastatur (Pfeiltasten) bedienbar.
 */
export function StarInput({ name, label, question, value, onChange, error }: StarInputProps) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset
      className="rounded-3xl border border-sage-900/8 bg-cream-50 p-5"
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend className="sr-only">{label}</legend>
      <p className="font-serif text-xl text-sage-900" aria-hidden>
        {label}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{question}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="cursor-pointer rounded-lg p-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sage-700"
              onMouseEnter={() => setHover(n)}
            >
              <input
                type="radio"
                name={name}
                value={n}
                checked={value === n}
                onChange={() => onChange(n)}
                className="sr-only"
              />
              <span className="sr-only">
                {n} {n === 1 ? "Stern" : "Sterne"} – {ratingLabels[n]}
              </span>
              <Star
                aria-hidden
                strokeWidth={1.5}
                className={cn(
                  "size-9 transition-all duration-150",
                  n <= shown ? "fill-bark-500 text-bark-500" : "text-bark-300",
                  n <= hover && "scale-110",
                )}
              />
            </label>
          ))}
        </div>
        <span className="min-h-5 text-sm font-medium text-bark-700" aria-live="polite">
          {shown ? ratingLabels[shown] : ""}
        </span>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
