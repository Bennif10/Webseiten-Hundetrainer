import { PenLine } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isPlaceholder } from "@/lib/placeholder";

/**
 * Zeigt einen Text an. Ist er ein Platzhalter (placeholder(…)), wird er
 * deutlich als solcher markiert, damit fehlende Inhalte nicht übersehen werden.
 */
export function Text({
  children,
  className,
  tone = "light",
}: {
  children: string;
  className?: string;
  /** "dark" für Platzhalter auf dunklem Hintergrund. */
  tone?: "light" | "dark";
}) {
  if (!isPlaceholder(children)) return <span className={className}>{children}</span>;
  return (
    <span
      className={cn(
        "rounded-md border border-dashed px-1.5 py-0.5 text-[0.92em] [box-decoration-break:clone]",
        tone === "light"
          ? "border-bark-300 bg-bark-200/40 text-bark-700"
          : "border-sage-300/60 bg-cream-50/5 text-sage-100",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Hinweisbox für ganze Bereiche, deren Inhalte noch fehlen. */
export function PlaceholderNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-2xl border border-dashed border-bark-300 bg-bark-200/30 p-4 text-sm leading-relaxed text-bark-700",
        className,
      )}
    >
      <PenLine className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
