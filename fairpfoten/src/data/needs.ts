import { Brain, Heart, HeartPulse, Moon, Signpost, Users } from "lucide-react";
import type { DogNeed } from "@/types";

/**
 * Die sechs Grundbedürfnisse – wörtlich aus dem Referenzplakat
 * „Was Hunde für ein gutes Leben brauchen“ übernommen.
 */
export const needsIntro = {
  title: "Was Hunde für ein gutes Leben brauchen",
  subtitle: "Die Grundlagen einer verantwortungsvollen Hundeerziehung",
};

export const dogNeeds: DogNeed[] = [
  {
    id: "ruhe",
    title: "Ruhe und Sicherheit",
    icon: Moon,
    points: [
      "Ausreichend Ruhephasen und Schlaf ermöglichen",
      "Rückzugsbereiche garantieren, in denen der Hund ungestört sein darf",
      "Sicherheit und Verlässlichkeit im Alltag schaffen",
    ],
  },
  {
    id: "gesundheit",
    title: "Körperliche Gesundheit",
    icon: HeartPulse,
    points: [
      "Optimale, bedarfsgerechte Ernährung",
      "Regelmäßige Gesundheitsvorsorge",
      "Auf körperliches Wohlbefinden und individuelle Bedürfnisse achten",
    ],
  },
  {
    id: "beschaeftigung",
    title: "Beschäftigung und Entwicklung",
    icon: Brain,
    points: [
      "Adäquate Beschäftigung entsprechend der Persönlichkeit und den Fähigkeiten",
      "Körperliche und geistige Auslastung mit Augenmaß",
      "Neue Erfahrungen ermöglichen, ohne den Hund zu überfordern",
    ],
  },
  {
    id: "sozial",
    title: "Soziale Integration",
    icon: Users,
    points: [
      "Soziale Integration in das familiäre und gesellschaftliche Umfeld",
      "Angemessene soziale Kontakte ermöglichen",
      "Individuelle Bedürfnisse und Grenzen des Hundes respektieren",
    ],
  },
  {
    id: "zuwendung",
    title: "Emotionale Zuwendung",
    icon: Heart,
    points: [
      "Emotionale Zuwendung und liebevolle Aufmerksamkeit",
      "Nähe ermöglichen, ohne den Hund emotional zu übersättigen",
      "Vertrauen und eine sichere Beziehung aufbauen",
    ],
  },
  {
    id: "grenzen",
    title: "Grenzen und Freiräume",
    icon: Signpost,
    points: [
      "Klare und verlässliche Grenzen vermitteln",
      "Freiräume und größtmögliche Selbstständigkeit ermöglichen",
      "Faire Führung und verständliche Kommunikation bieten",
    ],
  },
];

/** Leitsatz vom Plakat. */
export const guidingQuote = {
  lines: ["Ein Hund braucht mehr als Erziehung.", "Er braucht einen Menschen, der seine Bedürfnisse erkennt."],
};
