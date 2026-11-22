import { placeholder } from "@/lib/placeholder";
import type { Dog, Testimonial } from "@/types";

/**
 * Kundenstimmen – ausschließlich echte Stimmen mit Einverständnis der Personen eintragen.
 * Solange `isPlaceholder: true` gesetzt ist, wird der Bereich als Platzhalter angezeigt.
 */
export const testimonials: Testimonial[] = [
  { quote: placeholder("Echte Kundenstimme 1"), author: placeholder("Name / Hund"), isPlaceholder: true },
  { quote: placeholder("Echte Kundenstimme 2"), author: placeholder("Name / Hund"), isPlaceholder: true },
  { quote: placeholder("Echte Kundenstimme 3"), author: placeholder("Name / Hund"), isPlaceholder: true },
];

/** Die eigenen Hunde der Trainerin. */
export const dogs: Dog[] = [
  {
    name: placeholder("Name des Hundes"),
    description: placeholder("Rasse/Mix, Alter, Charakter – was macht diesen Hund besonders?"),
    isPlaceholder: true,
  },
];

/** Qualifikationen & Erfahrungen – nur tatsächlich vorhandene eintragen. */
export const qualifications: string[] = [
  placeholder("Ausbildung / Zertifizierung (z. B. Sachkundenachweis nach § 11 TierSchG)"),
  placeholder("Weitere Fortbildungen und Schwerpunkte"),
  placeholder("Erfahrung mit Hunden (Jahre, eigene Hunde, Tätigkeiten)"),
];
