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
    question: "Ist meine Anfrage über die Website schon eine feste Terminbuchung?",
    answer:
      "Nein. Über das Anfrageformular gibst du an, welches Paket dich interessiert und wann du grundsätzlich Zeit hast. Daraufhin bekommst du einen persönlichen Terminvorschlag – fest ist der Termin erst, wenn wir ihn gemeinsam vereinbart haben.",
  },
];
