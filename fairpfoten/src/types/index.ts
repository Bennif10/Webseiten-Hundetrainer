import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  /** Telefonische Erreichbarkeit, z. B. "Mo–Fr 9–17 Uhr". */
  phoneHours?: string;
  /** Trainingsgebiet bzw. Ort (z. B. "Raum Musterstadt"). */
  area?: string;
}

export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/** Eines der sechs Grundbedürfnisse aus dem Referenzplakat. */
export interface DogNeed {
  id: string;
  title: string;
  icon: LucideIcon;
  points: string[];
}

export interface TrainingService {
  id: string;
  title: string;
  /** Kurzbeschreibung für Karten. */
  summary: string;
  /** Für wen ist das Angebot gedacht? */
  audience: string;
  /** Dauer als Anzeige-Text, z. B. "3 Stunden". */
  duration?: string;
  /** Preis als Anzeige-Text, NUR wenn tatsächlich bekannt. */
  price?: string;
  /** Auf der Startseite als eines der Hauptangebote zeigen. */
  featured?: boolean;
  /** Zusätzliche Fragen im Anfrageformular nur für dieses Paket (optional). */
  inquiryQuestions?: InquiryQuestion[];
  /** true = Inhalt ist noch ein Platzhalter und muss ersetzt werden. */
  isPlaceholder: boolean;
}

export interface FaqItem {
  question: string;
  /** undefined = Antwort steht noch aus (wird als Platzhalter angezeigt). */
  answer?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  isPlaceholder: boolean;
}

export interface Dog {
  name: string;
  /** z. B. "Border Collie, 8 Jahre" */
  details?: string;
  /** Foto (statischer Import aus public/images) und Bildbeschreibung. */
  image?: StaticImageData;
  imageAlt?: string;
  /** Bildausschnitt, z. B. "50% 30%" (Standard: Mitte). */
  imagePosition?: string;
  description: string;
  isPlaceholder: boolean;
}

/* ---------- Anfrage ---------- */

/** Zusatzfrage im Anfrageformular (immer optional). */
export interface InquiryQuestion {
  id: string;
  label: string;
  placeholder?: string;
}

export interface InquiryRequest {
  serviceId: string;
  weekdays: string[];
  dayparts: string[];
  start?: string;
  timeNote?: string;
  /** Antworten auf Zusatzfragen, Schlüssel = InquiryQuestion.id */
  answers: Record<string, string>;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
