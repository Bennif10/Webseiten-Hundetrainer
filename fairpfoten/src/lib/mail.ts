import { availabilityConfig } from "@/config/availability";
import { siteConfig } from "@/config/site";
import { addMinutes, formatLongDate } from "@/lib/dates";
import type { BookingRequest, ContactRequest, TrainingService } from "@/types";

/**
 * Aufbau der Anfrage-E-Mails.
 *
 * Version 1 nutzt `mailto:` – das öffnet das E-Mail-Programm der Besucherin
 * bzw. des Besuchers. Es gibt KEINE garantierte Übermittlung.
 *
 * Für serverseitigen Versand später: einen Route Handler
 * (z. B. `src/app/api/anfrage/route.ts`) anlegen, der `buildBookingEmail`
 * wiederverwendet und die Nachricht über einen Mail-Dienst verschickt.
 */
export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
}

export function buildBookingEmail(req: BookingRequest, service: TrainingService | undefined): EmailDraft {
  const end = addMinutes(req.time, availabilityConfig.slotDurationMinutes);
  const lines = [
    "Hallo,",
    "",
    "ich möchte gerne folgenden Termin unverbindlich anfragen:",
    "",
    `Angebot: ${service?.title ?? req.serviceId}`,
    `Datum: ${formatLongDate(req.date)}`,
    `Uhrzeit: ${req.time} – ${end} Uhr`,
    "",
    `Name: ${req.name}`,
    `E-Mail: ${req.email}`,
    req.phone ? `Telefon: ${req.phone}` : null,
    "",
    req.message ? `Nachricht:\n${req.message}` : null,
    req.message ? "" : null,
    "Mir ist bewusst, dass der Termin erst nach deiner Bestätigung reserviert ist.",
    "",
    "Viele Grüße",
    req.name,
  ].filter((l): l is string => l !== null);

  return {
    to: siteConfig.contact.email,
    subject: `Terminanfrage: ${service?.title ?? "Training"} am ${req.date} um ${req.time} Uhr`,
    body: lines.join("\n"),
  };
}

export function buildContactEmail(req: ContactRequest): EmailDraft {
  const lines = [
    req.message,
    "",
    "—",
    `Name: ${req.name}`,
    `E-Mail: ${req.email}`,
    req.phone ? `Telefon: ${req.phone}` : null,
  ].filter((l): l is string => l !== null);

  return {
    to: siteConfig.contact.email,
    subject: `Kontaktanfrage über die Website von ${req.name}`,
    body: lines.join("\n"),
  };
}

/** E-Mail-Entwurf → mailto-URL (Zeilenumbrüche als CRLF laut RFC 6068). */
export function toMailtoUrl({ to, subject, body }: EmailDraft): string {
  const enc = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));
  return `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
}
