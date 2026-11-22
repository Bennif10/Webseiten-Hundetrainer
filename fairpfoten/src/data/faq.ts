import type { FaqItem } from "@/types";

/**
 * Häufige Fragen.
 * Fragen ohne `answer` werden auf der Website als „Antwort folgt“ gekennzeichnet.
 */
export const faqItems: FaqItem[] = [
  {
    question: "Wie läuft ein Erstgespräch ab?",
    answer: "Vor dem ersten Training telefonieren wir kurz miteinander – ca. 10 Minuten und kostenlos.",
  },
  {
    question: "Was sollte ich zum Training mitbringen?",
    answer: "Eine normale Führleine sowie Halsband oder Geschirr.",
  },
  {
    question: "Kann ich mit jedem Hund teilnehmen?",
    answer: "Ja. Wenn dein Hund einen Maulkorb trägt, bring ihn bitte mit.",
  },
  {
    question: "Wo findet das Training statt?",
    answer:
      "Nach Absprache – in Ebersbach und Umgebung. Es fallen Fahrtkosten von 0,48 € je km an, außer der Treffpunkt ist bei mir.",
  },
  {
    question: "Wie kann ich einen Termin absagen?",
    answer: "Ruf mich einfach an – wir finden eine Lösung.",
  },
  {
    question: "Ist meine Anfrage über die Website schon eine feste Terminbuchung?",
    answer:
      "Nein. Über das Anfrageformular gibst du an, welches Angebot dich interessiert und wann du grundsätzlich Zeit hast. Daraufhin bekommst du einen persönlichen Terminvorschlag – fest ist der Termin erst, wenn wir ihn gemeinsam vereinbart haben.",
  },
];
