import { placeholder } from "@/lib/placeholder";
import type { TrainingService } from "@/types";

/**
 * Trainingsangebote.
 *
 * Das Referenzmaterial enthält noch KEINE konkreten Angebote, Dauern oder Preise.
 * Die folgenden Einträge sind deshalb reine Platzhalter-Strukturen:
 *   - `title`, `summary`, `audience` ersetzen
 *   - `durationMinutes` / `price` nur eintragen, wenn sie feststehen
 *   - `isPlaceholder` danach auf `false` setzen
 *
 * Optional: `inquiryQuestions` – zusätzliche Fragen, die im Anfrageformular
 * nur bei diesem Paket erscheinen und in die E-Mail übernommen werden, z. B.
 *   inquiryQuestions: [{ id: "welpe-alter", label: "Wie alt ist dein Welpe?" }]
 *
 * Die `id` wird im Anfrageformular verwendet – bitte kurz und ohne
 * Leerzeichen halten (z. B. "einzeltraining").
 */
export const services: TrainingService[] = [
  {
    id: "angebot-1",
    title: placeholder("Name von Angebot 1"),
    summary: placeholder("Kurzbeschreibung: Was passiert in diesem Training, was ist das Ziel?"),
    audience: placeholder("Für wen ist dieses Angebot gedacht?"),
    isPlaceholder: true,
  },
  {
    id: "angebot-2",
    title: placeholder("Name von Angebot 2"),
    summary: placeholder("Kurzbeschreibung: Was passiert in diesem Training, was ist das Ziel?"),
    audience: placeholder("Für wen ist dieses Angebot gedacht?"),
    isPlaceholder: true,
  },
  {
    id: "angebot-3",
    title: placeholder("Name von Angebot 3"),
    summary: placeholder("Kurzbeschreibung: Was passiert in diesem Training, was ist das Ziel?"),
    audience: placeholder("Für wen ist dieses Angebot gedacht?"),
    isPlaceholder: true,
  },
];

export const getServiceById = (id: string) => services.find((s) => s.id === id);
