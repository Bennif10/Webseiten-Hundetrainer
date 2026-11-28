import { feedbackConfig, ratingCategories, ratingLabels } from "@/config/feedback";
import { inquiryConfig } from "@/config/inquiry";
import { siteConfig } from "@/config/site";
import { starString } from "@/lib/ratings";
import type { ContactRequest, FeedbackRequest, InquiryQuestion, InquiryRequest, TrainingService } from "@/types";

/** Feedback-E-Mail mit Sternen je Kategorie, Kommentar und Freigabe zur Veröffentlichung. */
export function buildFeedbackEmail(req: FeedbackRequest): EmailDraft {
  const { email: tpl } = feedbackConfig;
  const name = req.name?.trim() ?? "";

  const ratingLines = ratingCategories.map(({ id, label }) => {
    const value = req.ratings[id];
    return value ? `• ${label}: ${starString(value)} (${value}/5 – ${ratingLabels[value]})` : `• ${label}: [noch offen]`;
  });

  const publishLine = !req.publish
    ? "[noch nicht ausgewählt]"
    : req.publish === feedbackConfig.publishOptions[0]
      ? `Ja – ${name ? `als „${name}“` : "anonym"}`
      : "Nein, nur für dich";

  const lines = [
    tpl.greeting,
    "",
    tpl.intro,
    "",
    ...ratingLines,
    "",
    ...(req.comment?.trim() ? ["Mein Kommentar:", req.comment.trim(), ""] : []),
    `Darf mein Feedback auf der Website erscheinen? ${publishLine}`,
    "",
    tpl.signOff,
    name || "",
  ];

  return {
    to: siteConfig.contact.email,
    subject: tpl.subject(name),
    body: lines.join("\n").trimEnd(),
  };
}

/**
 * Aufbau der Anfrage-E-Mails.
 *
 * Version 1 nutzt `mailto:` – das öffnet das E-Mail-Programm der Besucherin
 * bzw. des Besuchers. Es gibt KEINE garantierte Übermittlung.
 *
 * Für serverseitigen Versand später: einen Route Handler
 * (z. B. `src/app/api/anfrage/route.ts`) anlegen, der `buildInquiryEmail`
 * wiederverwendet und die Nachricht über einen Mail-Dienst verschickt.
 */
export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
}

/** Alle Zusatzfragen für ein Paket: Standardfragen + paketspezifische Fragen. */
export function getQuestionsFor(service: TrainingService | undefined): InquiryQuestion[] {
  return [...inquiryConfig.defaultQuestions, ...(service?.inquiryQuestions ?? [])];
}

/** "• Label: Wert" – bei Fragen ("…?") ohne Doppelpunkt. */
const bullet = (label: string, value: string | undefined) =>
  value?.trim() ? `• ${label}${label.trim().endsWith("?") ? "" : ":"} ${value.trim()}` : null;
const list = (items: string[]) => (items.length ? items.join(", ") : undefined);

export function buildInquiryEmail(req: InquiryRequest, service: TrainingService | undefined): EmailDraft {
  const { email: tpl } = inquiryConfig;
  const title = service?.title ?? "[Angebot]";
  const name = req.name.trim() || "[Dein Name]";

  const timeLines = [
    bullet("Tage", list(req.weekdays)),
    bullet("Tageszeit", list(req.dayparts)),
    bullet("Start", req.start),
    bullet("Hinweis", req.timeNote),
  ].filter((l): l is string => l !== null);

  const answerLines = (questions: InquiryQuestion[]) =>
    questions.map((q) => bullet(q.label, req.answers[q.id])).filter((l): l is string => l !== null);
  const serviceLines = answerLines(service?.inquiryQuestions ?? []);
  const dogLines = answerLines(inquiryConfig.defaultQuestions);

  const lines: (string | null)[] = [
    tpl.greeting,
    "",
    tpl.intro(title),
    "",
    "Wann ich Zeit habe:",
    ...(timeLines.length ? timeLines : ["• [noch nicht angegeben]"]),
    "",
    ...(serviceLines.length ? ["Zum Angebot:", ...serviceLines, ""] : []),
    ...(dogLines.length ? ["Zu meinem Hund:", ...dogLines, ""] : []),
    ...(req.message?.trim() ? ["Meine Nachricht:", req.message.trim(), ""] : []),
    "So erreichst du mich:",
    `• E-Mail: ${req.email.trim() || "[deine E-Mail-Adresse]"}`,
    bullet("Telefon", req.phone),
    "",
    tpl.closing,
    "",
    tpl.signOff,
    name,
  ];

  return {
    to: siteConfig.contact.email,
    subject: tpl.subject(title, name),
    body: lines.filter((l): l is string => l !== null).join("\n"),
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
