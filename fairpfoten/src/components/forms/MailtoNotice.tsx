import { Info } from "lucide-react";
import { isContactEmailPlaceholder } from "@/config/site";

/** Transparenter Hinweis, dass die Anfrage über das eigene E-Mail-Programm verschickt wird. */
export function MailtoNotice() {
  return (
    <div className="flex gap-3 rounded-2xl bg-sage-50 p-4 text-sm leading-relaxed text-sage-900">
      <Info className="mt-0.5 size-4 shrink-0 text-sage-700" aria-hidden />
      <p>
        Beim Absenden öffnet sich dein E-Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn du sie dort
        abschickst, kommt sie bei mir an – eine Übermittlung direkt über die Website findet nicht statt.
        {isContactEmailPlaceholder && (
          <strong className="mt-2 block font-semibold text-bark-700">
            Hinweis: Die Empfängeradresse ist noch ein Platzhalter und muss vor dem Livegang eingetragen werden.
          </strong>
        )}
      </p>
    </div>
  );
}
