import elliImage from "../../public/images/hund-elli.jpg";
import millaImage from "../../public/images/hund-milla.jpg";
import type { Dog, Qualification, Testimonial } from "@/types";

/**
 * Kundenstimmen – ausschließlich echte Stimmen mit Einverständnis der Personen eintragen.
 * Solange die Liste leer ist, wird der Bereich auf der Startseite ausgeblendet.
 */
export const testimonials: Testimonial[] = [];

/** Die eigenen Hunde der Trainerin. */
export const dogs: Dog[] = [
  {
    name: "Elli",
    details: "Border Collie, 8 Jahre",
    image: elliImage,
    imageAlt: "Elli, eine schwarz-weiße Border-Collie-Hündin, liegt im hohen Gras und schaut freundlich zur Seite",
    imagePosition: "50% 30%",
    description:
      "Elli ist die Ruhe in mir. Die, die zuhört, versteht, fühlt, ohne Worte. Sie liebt klare Strukturen, vertraut nicht sofort, aber wenn, dann mit ganzem Herzen. Sie setzt Grenzen mit Würde, sucht Gerechtigkeit, bleibt fair. Ihre Welt ist leise, tief, durchdacht. Sie ist die, die sozial kompetent kommunizieren kann, weil sie weiß, wo sie steht. Elli setze ich gerne im Hundetraining mit ein.",
    isPlaceholder: false,
  },
  {
    name: "Milla",
    details: "Border Collie, 4 Jahre",
    image: millaImage,
    imageAlt: "Milla, eine schwarz-weiße Border-Collie-Hündin, sitzt auf Kunstrasen und schaut fröhlich nach oben in die Kamera",
    imagePosition: "50% 40%",
    description:
      "Milla ist wie das Feuer. Der erste Impuls. Sie liebt alles, jeden, sofort. Ungebremst, echt, herzlich. Manchmal stolpert sie über ihre eigene Begeisterung. Doch Milla hat Antennen, die tiefer gehen als Worte. Sie weiß, was wahr ist. Ihre Freude ist echt, ihre Angst ehrlich, ihr Mut ansteckend.",
    isPlaceholder: false,
  },
];

/** Qualifikationen & Erfahrungen (neueste zuerst). `detail` ist optional. */
export const qualifications: Qualification[] = [
  { title: "HTS-Trainerin – Hundeteamschule Anita Balser – November 2026" },
  {
    title: "HTS-Co-Trainerin – Hundeteamschule Anita Balser – Januar 2026",
    detail:
      "Teilnahme und Kundenanleitung bei diversen Seminaren der Hundeteamschule, z. B. „Jagd nach Ansprechbarkeit“, „Alleine ohne Leine – Leinenaggression“, „In Freiheit verbunden“ und „Teamsport“.",
  },
  {
    title:
      "Erlaubnis nach § 11 Tierschutzgesetz zum Ausbilden von Hunden bzw. zur Anleitung der Ausbildung durch den Halter",
  },
  { title: "Ausbildung zur Hundetrainerin – Ziemer & Falke – abgeschlossen Juli 2025" },
  { title: "Beginn der Ausbildung zur HTS-Trainerin – Hundeteamschule Anita Balser – Dezember 2024" },
];

/** Ausführliche Vorstellung für „Über mich“. */
export const aboutText = [
  "Mich fasziniert am Hundetraining, für jedes Mensch-Hund-Team seinen ganz eigenen Weg zu finden. Denn es gibt kein Patentrezept und keinen Plan A oder B – was für das eine Team stimmig ist, passt für das andere vielleicht noch nicht.",
  "Meine Stärke ist es, mich auf jedes Team individuell einzulassen, neue Perspektiven zu eröffnen und Mensch und Hund dabei zu unterstützen, gemeinsam zu wachsen und eine echte Beziehungsbasis zu entwickeln, die von gegenseitigem Verständnis, Respekt und Wertschätzung getragen wird.",
];

/** Philosophie der Hundeteamschule Anita Balser (HTS). */
export const htsPhilosophy =
  "Die Philosophie der Hundeteamschule Anita Balser basiert auf dem Aufbau einer stabilen Mensch-Hund-Beziehung durch Kommunikation in der Sprache der Hunde – insbesondere durch Körpersprache. Gelehrt wird das unter der Bezeichnung „Stimme der Hunde“.";
