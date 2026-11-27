import type { TrainingService } from "@/types";

/**
 * Trainingsangebote (Angaben von Stefanie Rathmer).
 *
 * Felder:
 *   - `duration` / `price` nur eintragen, wenn sie feststehen
 *   - `sortPrice` → niedrigster Preis in €, bestimmt die Reihenfolge (günstig → teuer)
 *   - `featured: true` → erscheint auf der Startseite (max. 3 sinnvoll)
 *   - `inquiryQuestions` → zusätzliche Fragen im Anfrageformular nur bei diesem Angebot,
 *     die auch in die E-Mail übernommen werden
 *   - `externalUrl` → Angebot wird extern gebucht (Link statt Anfrage, nicht im Anfrageformular)
 *
 * Die `id` wird im Anfrageformular und in Links verwendet (/anfrage?angebot=<id>) –
 * bitte kurz und ohne Leerzeichen halten.
 */
const allServices: TrainingService[] = [
  {
    id: "telefonberatung",
    title: "Telefonberatung",
    summary: "Beratung am Telefon zu deinen Fragen rund um deinen Hund.",
    audience: "Für alle, die eine Frage klären möchten.",
    duration: "30 Minuten oder 1 Stunde",
    price: "30 Min.: 30 € · 1 Stunde: 60 €",
    sortPrice: 30,
    inquiryQuestions: [{ id: "beratung-dauer", label: "30 Minuten oder 1 Stunde?", placeholder: "30 Minuten / 1 Stunde" }],
    isPlaceholder: false,
  },
  {
    id: "walk-and-talk",
    title: "Walk & Talk",
    summary: "Gemeinsam unterwegs: Training und Austausch beim Spaziergang.",
    audience: "Für Mensch-Hund-Teams.",
    duration: "1 Stunde",
    price: "39 €",
    sortPrice: 39,
    isPlaceholder: false,
  },
  {
    id: "lernkontrolle",
    title: "Lernkontrolle",
    summary: "Der Folgetermin nach einem Intensivtag oder Gruppenintensivtag. Gruppenlernkontrollen auf Anfrage.",
    audience: "Für Teams, die bereits an einem INT, GINT o. Ä. teilgenommen haben.",
    duration: "1 Stunde",
    price: "80 €",
    sortPrice: 80,
    inquiryQuestions: [{ id: "letzter-termin", label: "Wann war dein INT / GINT?", placeholder: "z. B. März 2026" }],
    isPlaceholder: false,
  },
  {
    id: "gruppenintensivtag",
    title: "Gruppenintensivtag (GINT)",
    summary:
      "Der Intensivtag in der kleinen Gruppe: Ihr startet gemeinsam mit anderen Teams in die Arbeit nach HTS.",
    audience: "Ab 2 Mensch-Hund-Teams, die die Arbeit nach HTS noch nicht kennen.",
    duration: "4 Stunden",
    price: "bei 3 Teams 165 € · bei 2 Teams 195 €",
    sortPrice: 165,
    featured: true,
    inquiryQuestions: [{ id: "anzahl-teams", label: "Mit wie vielen Teams kommt ihr?", placeholder: "z. B. 2" }],
    isPlaceholder: false,
  },
  {
    id: "intensivtag",
    title: "Einzelintensivtag (INT)",
    summary:
      "Der Einstieg in die Arbeit nach der Hundeteamschule Anita Balser: ein Tag für neue Perspektiven und echte Veränderung – einer, der oft mehr bewegt als Monate von „Training“.",
    audience: "Für Mensch-Hund-Teams, die die Arbeit nach HTS noch nicht kennen.",
    duration: "3 Stunden",
    price: "250 €",
    sortPrice: 250,
    featured: true,
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
    sortPrice: 320,
    featured: true,
    inquiryQuestions: [
      { id: "welpenpaket-groesse", label: "Kleines oder großes Paket?", placeholder: "klein (4 Std.) / groß (6 Std.)" },
    ],
    isPlaceholder: false,
  },
  {
    id: "seminare",
    title: "Seminare",
    summary:
      "Seminare der Hundeteamschule Anita Balser – Themen, Termine und Orte findest du direkt auf der Website der Hundeteamschule.",
    audience: "Für Mensch-Hund-Teams.",
    externalUrl: "https://hundeteamschule.de/seminare/",
    isPlaceholder: false,
  },
];

/** Alle Angebote, von günstig nach teuer; Angebote ohne Preis stehen am Ende. */
export const services: TrainingService[] = [...allServices].sort(
  (a, b) => (a.sortPrice ?? Number.POSITIVE_INFINITY) - (b.sortPrice ?? Number.POSITIVE_INFINITY),
);

/** Hauptangebote für die Startseite (ebenfalls nach Preis sortiert). */
export const featuredServices = services.filter((s) => s.featured);

/** Angebote, die über das Anfrageformular angefragt werden können. */
export const inquirableServices = services.filter((s) => !s.externalUrl);

export const getServiceById = (id: string) => services.find((s) => s.id === id);
