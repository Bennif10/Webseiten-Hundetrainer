import { placeholder } from "@/lib/placeholder";
import type { ContactInfo, NavItem, SocialLink } from "@/types";

const contact: ContactInfo = {
  /** Empfänger für Termin- und Kontaktanfragen (mailto). */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "kontakt@fairpfoten.example",
  /** Telefonnummer, z. B. "+49 123 456789" – leer lassen, falls nicht gewünscht. */
  phone: undefined,
  area: placeholder("Trainingsgebiet bzw. Ort"),
};

/**
 * Zentrale Stammdaten der Website.
 * Alle mit placeholder(…) markierten Werte müssen vor dem Livegang ersetzt werden.
 */
export const siteConfig = {
  name: "Fairpfoten",
  subtitle: "Hundetraining",
  /** Claim aus dem Referenzplakat. */
  tagline: "mit Herz und Haltung.",
  /** Kernbotschaft aus dem Referenzplakat. */
  claim: "Fair. Klar. Individuell.",
  description:
    "Fairpfoten Hundetraining – mit Herz und Haltung. Training, das die Bedürfnisse deines Hundes in den Mittelpunkt stellt: fair, klar und individuell.",
  /** Wird für Sitemap, Open Graph und kanonische URLs verwendet. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "de_DE",

  trainer: {
    name: placeholder("Name der Hundetrainerin"),
    /** Kurzbiografie für Startseite und „Über mich“. */
    shortBio: placeholder(
      "Kurze persönliche Vorstellung (2–3 Sätze): Wer bist du, seit wann arbeitest du mit Hunden, was treibt dich an?",
    ),
  },

  contact,

  /** Social-Media-Profile – leer lassen, solange keine vorhanden sind. */
  social: [] as SocialLink[],
} as const;

/** true, solange noch keine echte E-Mail-Adresse hinterlegt ist. */
export const isContactEmailPlaceholder = siteConfig.contact.email.endsWith(".example");

export const mainNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Training", href: "/trainingsangebote" },
  { label: "Termine", href: "/termine" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
