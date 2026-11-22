import type { AvailabilityConfig } from "@/types";

/**
 * Verfügbare Zeitfenster für Terminanfragen.
 *
 * ⚠️ BEISPIELDATEN – bitte vor dem Livegang an die echten Zeiten anpassen
 *    und anschließend `isExampleData` auf `false` setzen.
 *
 * Formate:
 *   Datum   → "YYYY-MM-DD"  (z. B. "2026-12-24")
 *   Uhrzeit → "HH:MM"       (z. B. "09:30")
 *
 * Wochentage: 0 = Sonntag, 1 = Montag, 2 = Dienstag, 3 = Mittwoch,
 *             4 = Donnerstag, 5 = Freitag, 6 = Samstag
 */
export const availabilityConfig: AvailabilityConfig = {
  isExampleData: true,

  /** Länge eines Zeitfensters (nur zur Anzeige / für die Anfrage-Mail). */
  slotDurationMinutes: 60,

  /** Termine können bis zu so vielen Tagen im Voraus angefragt werden. */
  bookingWindowDays: 90,

  /** Mindestvorlauf: Zeitfenster, die früher beginnen, sind nicht wählbar. */
  minLeadTimeHours: 24,

  /** Regelmäßige Zeitfenster pro Wochentag. Fehlender Wochentag = kein Training. */
  weeklySchedule: {
    1: ["09:00", "10:30", "15:00"],
    2: ["09:00", "10:30", "16:30"],
    3: ["15:00", "16:30"],
    4: ["09:00", "10:30", "15:00", "16:30"],
    5: ["09:00", "10:30"],
    6: ["10:00", "11:30"],
  },

  /** Ganze Tage ohne Termine (Urlaub, Feiertage, Fortbildungen …). */
  blockedDates: ["2026-12-24", "2026-12-25", "2026-12-26", "2026-12-31", "2027-01-01"],

  /** Bereits vergebene Zeitfenster – erscheinen als „belegt“. */
  bookedSlots: [
    { date: "2026-11-26", time: "09:00" },
    { date: "2026-11-27", time: "10:30" },
    { date: "2026-12-01", time: "09:00" },
    { date: "2026-12-01", time: "10:30" },
    { date: "2026-12-03", time: "15:00" },
  ],

  /** Zusätzliche Zeitfenster an einzelnen Tagen (z. B. Sonderaktionen). */
  extraSlots: [],
};
