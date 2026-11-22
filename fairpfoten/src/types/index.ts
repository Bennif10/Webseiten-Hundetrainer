import type { LucideIcon } from "lucide-react";

/** ISO-Datum im Format YYYY-MM-DD (lokale Kalenderzeit, ohne Uhrzeit). */
export type ISODate = string;

/** Uhrzeit im Format HH:MM (24h). */
export type TimeOfDay = string;

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  /** Trainingsgebiet bzw. Ort (z. B. "Raum Musterstadt"). */
  area?: string;
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
  /** Dauer in Minuten, falls bekannt. */
  durationMinutes?: number;
  /** Preis als Anzeige-Text, NUR wenn tatsächlich bekannt. */
  price?: string;
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
  description: string;
  isPlaceholder: boolean;
}

/* ---------- Terminanfrage ---------- */

export interface WeeklySchedule {
  /** 0 = Sonntag, 1 = Montag … 6 = Samstag */
  [weekday: number]: TimeOfDay[];
}

export interface AvailabilityConfig {
  /** true = Beispieldaten, die vor dem Livegang ersetzt werden müssen. */
  isExampleData: boolean;
  slotDurationMinutes: number;
  /** Wie viele Tage im Voraus können Termine angefragt werden? */
  bookingWindowDays: number;
  /** Mindestvorlauf in Stunden bis zum Termin. */
  minLeadTimeHours: number;
  weeklySchedule: WeeklySchedule;
  /** Ganze Tage ohne Termine (Urlaub, Feiertage …). */
  blockedDates: ISODate[];
  /** Einzelne bereits belegte Zeitfenster. */
  bookedSlots: { date: ISODate; time: TimeOfDay }[];
  /** Zusätzliche Zeitfenster an bestimmten Tagen. */
  extraSlots: { date: ISODate; times: TimeOfDay[] }[];
}

export type SlotStatus = "available" | "booked" | "past";

export interface TimeSlot {
  time: TimeOfDay;
  status: SlotStatus;
}

export interface BookingRequest {
  serviceId: string;
  date: ISODate;
  time: TimeOfDay;
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
