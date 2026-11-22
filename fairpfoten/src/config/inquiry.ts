import type { InquiryQuestion } from "@/types";

/**
 * Einstellungen für die Anfrage-E-Mail („Training anfragen“).
 *
 * Statt eines Kalenders gibt die Besucherin bzw. der Besucher grob an,
 * wann sie/er Zeit hat. Daraus wird eine fertige E-Mail vorbereitet.
 * Hier muss nichts regelmäßig gepflegt werden.
 */
export const inquiryConfig = {
  /** Wochentage, die zur Auswahl stehen. Tage ohne Training einfach entfernen. */
  weekdays: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],

  /** Tageszeiten, die zur Auswahl stehen. */
  dayparts: ["Vormittags", "Mittags", "Nachmittags", "Abends"],

  /** Antwortmöglichkeiten für „Ab wann möchtest du starten?“ */
  startOptions: ["So bald wie möglich", "In den nächsten Wochen", "Später / ich bin flexibel"],

  /**
   * Fragen, die bei JEDEM Paket gestellt werden (alle optional).
   * Zusätzliche Fragen für ein bestimmtes Paket: in src/data/services.ts
   * beim Paket unter `inquiryQuestions` eintragen.
   */
  defaultQuestions: [
    { id: "dog-name", label: "Name des Hundes", placeholder: "z. B. Balu" },
    { id: "dog-age", label: "Alter", placeholder: "z. B. 2 Jahre oder 14 Wochen" },
    { id: "dog-breed", label: "Rasse / Mix", placeholder: "z. B. Border-Collie-Mix" },
  ] satisfies InquiryQuestion[],

  /** Textbausteine der E-Mail. */
  email: {
    subject: (serviceTitle: string, name: string) => `Anfrage: ${serviceTitle} – ${name}`,
    greeting: "Hallo,",
    intro: (serviceTitle: string) =>
      `ich interessiere mich für „${serviceTitle}“ und würde gerne einen Termin mit dir vereinbaren.`,
    closing: "Ich freue mich auf deine Rückmeldung!",
    signOff: "Viele Grüße",
  },
};
