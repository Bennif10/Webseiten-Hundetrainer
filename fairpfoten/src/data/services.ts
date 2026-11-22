import type { TrainingService } from "@/types";

/**
 * Trainingsangebote (Angaben aus dem Fragebogen von Stefanie Rathmer).
 *
 * Felder:
 *   - `duration` / `price` nur eintragen, wenn sie feststehen
 *   - `featured: true` → erscheint auf der Startseite (max. 3 sinnvoll)
 *   - `inquiryQuestions` → zusätzliche Fragen im Anfrageformular nur bei diesem Paket,
 *     die auch in die E-Mail übernommen werden
 *
 * Die `id` wird im Anfrageformular und in Links verwendet (/anfrage?angebot=<id>) –
 * bitte kurz und ohne Leerzeichen halten.
 */
export const services: TrainingService[] = [
  {
    id: "intensivtag",
    title: "Intensivtag (INT)",
    summary:
      "Der Einstieg in die Arbeit nach der Hundeteamschule Anita Balser: ein Tag für neue Perspektiven und echte Veränderung – einer, der oft mehr bewegt als Monate von „Training“.",
    audience: "Für Mensch-Hund-Teams, die die Arbeit nach HTS noch nicht kennen.",
    duration: "3 Stunden",
    price: "250 €",
    featured: true,
    isPlaceholder: false,
  },
  {
    id: "gruppenintensivtag",
    title: "Gruppenintensivtag (GINT)",
    summary:
      "Der Intensivtag in der kleinen Gruppe: Ihr startet gemeinsam mit anderen Teams in die Arbeit nach HTS.",
    audience: "Ab 2 Mensch-Hund-Teams, die die Arbeit nach HTS noch nicht kennen.",
    duration: "4 Stunden",
    price: "190 € bei 2 Teams · 165 € bei 3 Teams",
    featured: true,
    inquiryQuestions: [{ id: "anzahl-teams", label: "Mit wie vielen Teams kommt ihr?", placeholder: "z. B. 2" }],
    isPlaceholder: false,
  },
  {
    id: "welpenpaket",
    title: "Welpenpaket",
    summary:
      "Begleitung für dich und deinen Welpen – die Stunden verteilen wir über den Zeitraum, den du dir wünschst.",
    audience: "Für Welpen und ihre Menschen.",
    duration: "klein: 4 Stunden · groß: 6 Stunden",
    price: "klein: 320 € · groß: 440 €",
    featured: true,
    inquiryQuestions: [
      { id: "welpenpaket-groesse", label: "Kleines oder großes Paket?", placeholder: "klein (4 Std.) / groß (6 Std.)" },
    ],
    isPlaceholder: false,
  },
  {
    id: "lernkontrolle",
    title: "Lernkontrolle",
    summary: "Der Folgetermin nach einem Intensivtag oder Gruppenintensivtag.",
    audience: "Für Teams, die bereits an einem INT, GINT o. Ä. teilgenommen haben.",
    price: "80 €",
    inquiryQuestions: [{ id: "letzter-termin", label: "Wann war dein INT / GINT?", placeholder: "z. B. März 2026" }],
    isPlaceholder: false,
  },
  {
    id: "walk-and-talk",
    title: "Walk and Talk",
    summary: "Gemeinsam unterwegs: Training und Austausch beim Spaziergang.",
    audience: "Für Mensch-Hund-Teams.",
    price: "39 € pro Stunde",
    isPlaceholder: false,
  },
  {
    id: "telefonberatung",
    title: "Telefonberatung",
    summary: "Beratung am Telefon zu deinen Fragen rund um deinen Hund.",
    audience: "Für alle, die eine Frage klären möchten.",
    price: "60 € pro Stunde",
    isPlaceholder: false,
  },
  {
    id: "weitere-angebote",
    title: "Einzeltraining, Social Walks & Seminare",
    summary:
      "Natürlich begleite ich euch auch im Einzeltraining, bei Social Walks und in Seminaren. Sprich mich einfach an.",
    audience: "Für Mensch-Hund-Teams.",
    price: "auf Anfrage",
    isPlaceholder: false,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export const getServiceById = (id: string) => services.find((s) => s.id === id);
