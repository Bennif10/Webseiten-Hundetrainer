import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";

/** Akkordeon auf Basis von <details>/<summary> – barrierearm und ohne JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-sage-900/10 border-y border-sage-900/10">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-xl leading-snug text-sage-900 sm:text-2xl">{item.question}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-sage-700/20 text-sage-700 transition-transform duration-300 group-open:rotate-45 group-open:bg-sage-700 group-open:text-cream-50">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <div className="pr-14 pb-6 leading-relaxed text-ink-muted">
            {item.answer ?? (
              <span className="rounded-md border border-dashed border-bark-300 bg-bark-200/40 px-1.5 py-0.5 text-bark-700">
                [Platzhalter: Antwort folgt]
              </span>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
