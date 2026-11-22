import { Mail } from "lucide-react";
import type { EmailDraft } from "@/lib/mail";

/** Live-Vorschau der vorbereiteten E-Mail. */
export function EmailPreview({ draft }: { draft: EmailDraft }) {
  return (
    <div className="overflow-hidden rounded-4xl border border-sage-900/6 bg-cream-50 shadow-soft">
      <div className="flex items-center gap-2.5 border-b border-sage-900/8 bg-sage-50 px-6 py-4">
        <Mail className="size-4 text-sage-700" aria-hidden />
        <h3 className="font-sans text-sm font-semibold text-sage-900">Vorschau deiner E-Mail</h3>
      </div>
      <dl className="space-y-1 border-b border-sage-900/8 px-6 py-4 text-xs">
        <div className="flex gap-2">
          <dt className="w-14 shrink-0 text-ink-muted">An:</dt>
          <dd className="break-all text-sage-900">{draft.to}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-14 shrink-0 text-ink-muted">Betreff:</dt>
          <dd className="break-words text-sage-900">{draft.subject}</dd>
        </div>
      </dl>
      <pre
        className="max-h-[28rem] overflow-auto px-6 py-5 font-sans text-[0.8rem] leading-relaxed break-words whitespace-pre-wrap text-ink"
        aria-live="polite"
      >
        {draft.body}
      </pre>
    </div>
  );
}
