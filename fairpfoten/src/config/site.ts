import type { ContactInfo, NavItem, PostalAddress, SocialLink } from "@/types";

const contact: ContactInfo = {
  /** Empfänger für Trainings- und Kontaktanfragen (mailto). */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "steffi@hundeteamschule.de",
  phone: "0159 0237 5617",
  phoneHours: "Mo–Mi 18–20 Uhr · Do–So 9–20 Uhr",
  area: "Ebersbach und Umgebung, je nach Absprache",
};

/** Ladungsfähige Anschrift (Impressum, Datenschutz, Suchmaschinen-Daten). */
const address: PostalAddress = {
  street: "Zeppelinstraße 30",
  postalCode: "73061",
  city: "Ebersbach an der Fils",
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
    "Fairpfoten Hundetraining in Ebersbach und Umgebung – mit Herz und Haltung. Training nach der Hundeteamschule Anita Balser: fair, klar und individuell für jedes Mensch-Hund-Team.",
  /** Wird für Sitemap, Open Graph und kanonische URLs verwendet. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "de_DE",

  trainer: {
    name: "Stefanie Rathmer",
    firstName: "Steffi",
    /** Kurzbiografie für Startseite und „Über mich“. */
    shortBio:
      "Ich bin Steffi und Trainerin der Hundeteamschule Anita Balser. Unser Credo ist: „Wir sind die Stimme der Hunde“ und „Ich will dir gut“.",
  },

  /** Wann Training grundsätzlich stattfindet. */
  trainingTimes: "Donnerstag bis Sonntag nach Vereinbarung, zwischen 9 und 20 Uhr",

  /** Hinweis zu allen Preisen. */
  pricingNote:
    "Alle Preise zzgl. Fahrtkosten von 0,48 € je km – außer der Treffpunkt ist bei mir. Als Kleinunternehmerin gemäß § 19 UStG weise ich keine Umsatzsteuer aus.",

  contact,
  address,

  /** Social-Media-Profile – leer lassen, solange keine vorhanden sind. */
  social: [] as SocialLink[],
} as const;

/** true, solange noch keine echte E-Mail-Adresse hinterlegt ist. */
export const isContactEmailPlaceholder = siteConfig.contact.email.endsWith(".example");

export const mainNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Training", href: "/trainingsangebote" },
  { label: "Anfrage", href: "/anfrage" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
