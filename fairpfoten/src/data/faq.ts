import type { FaqItem } from "@/types";

/**
 * Häufige Fragen.
 * Antworten fehlen noch – `answer` ergänzen, sobald die Informationen vorliegen.
 * Fragen ohne Antwort werden auf der Website als „Antwort folgt“ gekennzeichnet.
 */
export const faqItems: FaqItem[] = [
  { question: "Wie läuft ein Erstgespräch ab?" },
  { question: "Was sollte ich zum Training mitbringen?" },
  { question: "Kann ich mit jedem Hund teilnehmen?" },
  { question: "Wo findet das Training statt?" },
  { question: "Wie kann ich einen Termin absagen?" },
  {
    question: "Ist meine Terminanfrage über die Website schon eine feste Buchung?",
    answer:
      "Nein. Über die Terminübersicht stellst du eine unverbindliche Anfrage. Der Termin ist erst reserviert, wenn du eine persönliche Bestätigung erhalten hast.",
  },
];
