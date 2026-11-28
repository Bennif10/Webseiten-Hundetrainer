import type { RatingCategory } from "@/types";

/**
 * Einstellungen für das Feedback-Formular (/feedback) und die Bewertungsanzeige.
 *
 * Ablauf: Kundin füllt /feedback aus → fertige E-Mail an die Trainerin →
 * die Trainerin entscheidet, was veröffentlicht wird → Eintrag in
 * src/data/people.ts unter `testimonials`.
 */
export const ratingCategories: RatingCategory[] = [
  {
    id: "knowhow",
    label: "Fachliches Know-how",
    question: "Wie kompetent und verständlich hast du die fachliche Beratung erlebt?",
  },
  {
    id: "progress",
    label: "Fortschritt meines Hundes",
    question: "Wie sehr hat sich das Verhalten deines Hundes verbessert?",
  },
  {
    id: "care",
    label: "Betreuung & Miteinander",
    question: "Wie hast du dich menschlich betreut und aufgehoben gefühlt?",
  },
];

/** Beschriftung der Sternwerte (für Screenreader und Vorschau). */
export const ratingLabels: Record<number, string> = {
  1: "nicht zufrieden",
  2: "weniger zufrieden",
  3: "zufrieden",
  4: "sehr zufrieden",
  5: "begeistert",
};

export const feedbackConfig = {
  /** Antwortmöglichkeiten zur Veröffentlichung. */
  publishOptions: ["Ja, gerne", "Nein, nur für Steffi"],

  /**
   * Pflichthinweis, wie die Echtheit der Bewertungen sichergestellt wird
   * (§ 5b Abs. 3 UWG) – erscheint unter den Bewertungen.
   */
  verificationNotice:
    "Alle Bewertungen stammen von Kundinnen und Kunden, die mit mir trainiert haben. Ich prüfe jede Bewertung vor der Veröffentlichung und veröffentliche sie nur mit Einverständnis.",

  email: {
    subject: (name: string) => (name ? `Feedback zum Training von ${name}` : "Feedback zum Training"),
    greeting: "Hallo Steffi,",
    intro: "hier ist mein Feedback zum Training:",
    signOff: "Viele Grüße",
  },
};
