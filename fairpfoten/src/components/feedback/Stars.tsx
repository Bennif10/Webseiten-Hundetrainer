import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatRating } from "@/lib/ratings";

/** Anzeige von 0–5 Sternen (auch halbe Sterne für Durchschnittswerte). */
export function Stars({ value, size = "md", className }: { value: number; size?: "sm" | "md"; className?: string }) {
  const iconSize = size === "sm" ? "size-4" : "size-5";
  return (
    <span
      role="img"
      aria-label={`${formatRating(value)} von 5 Sternen`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className={cn("relative inline-block", iconSize)} aria-hidden>
            <Star className={cn("absolute inset-0 text-bark-300", iconSize)} strokeWidth={1.5} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={cn("fill-bark-500 text-bark-500", iconSize)} strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
