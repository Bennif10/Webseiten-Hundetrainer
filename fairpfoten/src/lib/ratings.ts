import { ratingCategories } from "@/config/feedback";
import type { RatingCategoryId, Testimonial } from "@/types";

/** Durchschnitt pro Kategorie (auf eine Nachkommastelle gerundet). */
export function averageRatings(items: Testimonial[]): Record<RatingCategoryId, number> {
  const result = {} as Record<RatingCategoryId, number>;
  for (const { id } of ratingCategories) {
    const sum = items.reduce((acc, t) => acc + t.ratings[id], 0);
    result[id] = items.length ? Math.round((sum / items.length) * 10) / 10 : 0;
  }
  return result;
}

/** 4.8 → "4,8" */
export const formatRating = (value: number) =>
  value.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** "2026-11" → "November 2026" */
export function formatMonth(date: string): string {
  const [y, m] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(new Date(y, m - 1, 1));
}

/** 4 → "★★★★☆" (für die E-Mail) */
export const starString = (value: number) => "★".repeat(value) + "☆".repeat(5 - value);
