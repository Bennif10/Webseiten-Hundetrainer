"use client";

import { CheckCircle2, Copy, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { ConsentCheckbox, InputField, TextareaField } from "@/components/forms/Field";
import { MailtoNotice } from "@/components/forms/MailtoNotice";
import { Button } from "@/components/ui/Button";
import { inquiryConfig } from "@/config/inquiry";
import { siteConfig } from "@/config/site";
import { getServiceById, inquirableServices } from "@/data/services";
import { buildInquiryEmail, getQuestionsFor, toMailtoUrl, type EmailDraft } from "@/lib/mail";
import {
  hasErrors,
  validateConsent,
  validateEmail,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";
import { ChipGroup } from "./ChipGroup";
import { EmailPreview } from "./EmailPreview";
import { ServicePicker } from "./ServicePicker";

type Fields = "service" | "time" | "name" | "email" | "phone" | "consent";

/** Reihenfolge, in der bei Fehlern zum ersten fehlerhaften Feld gesprungen wird. */
const FIELD_TARGETS: [Fields, string][] = [
  ["service", "step-service"],
  ["time", "step-time"],
  ["name", "inquiry-name"],
  ["email", "inquiry-email"],
  ["phone", "inquiry-phone"],
  ["consent", "inquiry-consent"],
];

function Step({ number, title, intro, id, children }: { number: number; title: string; intro?: string; id: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 rounded-4xl border border-sage-900/6 bg-cream-50/60 p-5 sm:p-7">
      <h2 id={`${id}-title`} className="flex items-center gap-3 text-2xl sm:text-[1.7rem]">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage-700 font-sans text-sm font-semibold text-cream-50">
          {number}
        </span>
        {title}
      </h2>
      {intro && <p className="mt-2 text-sm text-ink-muted sm:pl-11">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function InquiryWidget() {
  const searchParams = useSearchParams();

  const [serviceId, setServiceId] = useState<string | null>(() => {
    const fromUrl = searchParams.get("angebot");
    return fromUrl && inquirableServices.some((s) => s.id === fromUrl) ? fromUrl : null;
  });
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [dayparts, setDayparts] = useState<string[]>([]);
  const [start, setStart] = useState<string[]>([]);
  const [timeNote, setTimeNote] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<Fields>>({});
  const [sentDraft, setSentDraft] = useState<EmailDraft | null>(null);
  const [copied, setCopied] = useState(false);

  const service = serviceId ? getServiceById(serviceId) : undefined;
  const questions = getQuestionsFor(service);

  const draft = buildInquiryEmail(
    {
      serviceId: serviceId ?? "",
      weekdays: inquiryConfig.weekdays.filter((d) => weekdays.includes(d)), // Reihenfolge Mo → So
      dayparts: inquiryConfig.dayparts.filter((d) => dayparts.includes(d)),
      start: start[0],
      timeNote,
      answers,
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    },
    service,
  );

  const clearError = (key: Fields) => errors[key] && setErrors((e) => ({ ...e, [key]: undefined }));

  const setField = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (key !== "message") clearError(key);
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FieldErrors<Fields> = {
      service: serviceId ? undefined : "Bitte wähle ein Angebot.",
      time:
        weekdays.length || dayparts.length || timeNote.trim()
          ? undefined
          : "Bitte gib an, wann du grundsätzlich Zeit hast – Tage, Tageszeit oder ein kurzer Hinweis genügen.",
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      consent: validateConsent(consent),
    };
    setErrors(next);

    if (hasErrors(next)) {
      const target = FIELD_TARGETS.find(([k]) => next[k]);
      const el = target && document.getElementById(target[1]);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el instanceof HTMLInputElement) el.focus({ preventScroll: true });
      return;
    }

    window.location.assign(toMailtoUrl(draft));
    setSentDraft(draft);
  }

  async function copyDraft() {
    if (!sentDraft) return;
    try {
      await navigator.clipboard.writeText(`An: ${sentDraft.to}\nBetreff: ${sentDraft.subject}\n\n${sentDraft.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  /* ---------- Nach dem Absenden ---------- */
  if (sentDraft) {
    return (
      <div className="mx-auto max-w-2xl rounded-4xl bg-cream-50 p-7 shadow-soft sm:p-10" role="status">
        <CheckCircle2 className="size-11 text-sage-600" aria-hidden />
        <h2 className="mt-4 text-4xl">Fast geschafft!</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Dein E-Mail-Programm sollte sich mit der vorbereiteten Anfrage geöffnet haben.{" "}
          <strong className="font-semibold text-ink">Bitte sende die E-Mail dort ab</strong> – erst dann kommt sie an.
          Ich melde mich dann mit einem Terminvorschlag bei dir.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Hat sich nichts geöffnet? Dann kopiere die Anfrage und schicke sie an{" "}
          <a href={`mailto:${sentDraft.to}`} className="font-medium break-all text-sage-800 underline">
            {sentDraft.to}
          </a>
          .
        </p>
        <div className="mt-6">
          <EmailPreview draft={sentDraft} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={copyDraft}>
            <Copy className="size-4" aria-hidden />
            {copied ? "Kopiert!" : "Anfrage kopieren"}
          </Button>
          <Button variant="secondary" onClick={() => setSentDraft(null)}>
            Anfrage bearbeiten
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- Formular ---------- */
  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
      <div className="min-w-0 space-y-6">
        <Step number={1} title="Angebot wählen" intro={inquiryConfig.serviceHint} id="step-service">
          <ServicePicker
            services={inquirableServices}
            selected={serviceId}
            onSelect={(id) => {
              setServiceId(id);
              clearError("service");
            }}
            error={errors.service}
          />
        </Step>

        <Step
          number={2}
          title="Wann hast du Zeit?"
          intro={`Training findet ${siteConfig.trainingTimes} statt. Eine grobe Angabe reicht – ich schlage dir dann einen passenden Termin vor.`}
          id="step-time"
        >
          <div className="space-y-6">
            <ChipGroup
              legend="An welchen Tagen?"
              name="weekdays"
              options={inquiryConfig.weekdays}
              selected={weekdays}
              onChange={(v) => {
                setWeekdays(v);
                clearError("time");
              }}
            />
            <ChipGroup
              legend="Zu welcher Tageszeit?"
              name="dayparts"
              options={inquiryConfig.dayparts}
              selected={dayparts}
              onChange={(v) => {
                setDayparts(v);
                clearError("time");
              }}
            />
            <ChipGroup
              legend="Ab wann möchtest du starten?"
              name="start"
              multiple={false}
              options={inquiryConfig.startOptions}
              selected={start}
              onChange={setStart}
            />
            <InputField
              id="inquiry-time-note"
              label="Sonstiges zur Zeit"
              optional
              placeholder="z. B. „unter der Woche erst ab 17 Uhr“"
              value={timeNote}
              onChange={(e) => {
                setTimeNote(e.target.value);
                clearError("time");
              }}
            />
            {errors.time && (
              <p className="text-sm text-red-800" role="alert">
                {errors.time}
              </p>
            )}
          </div>
        </Step>

        <Step number={3} title="Über dich & deinen Hund" id="step-details">
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                id="inquiry-name"
                label="Dein Name"
                autoComplete="name"
                value={values.name}
                onChange={setField("name")}
                error={errors.name}
              />
              <InputField
                id="inquiry-email"
                label="E-Mail-Adresse"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.email}
                onChange={setField("email")}
                error={errors.email}
              />
            </div>
            <InputField
              id="inquiry-phone"
              label="Telefon"
              type="tel"
              autoComplete="tel"
              optional
              hint="Für kurzfristige Rückfragen"
              value={values.phone}
              onChange={setField("phone")}
              error={errors.phone}
            />

            <div className="grid gap-5 sm:grid-cols-3">
              {questions.map((q) => (
                <InputField
                  key={q.id}
                  id={`inquiry-q-${q.id}`}
                  label={q.label}
                  optional
                  placeholder={q.placeholder}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                />
              ))}
            </div>

            <TextareaField
              id="inquiry-message"
              label="Worum geht es?"
              optional
              rows={4}
              placeholder="Erzähl mir gern kurz, was du dir vom Training wünschst …"
              value={values.message}
              onChange={setField("message")}
            />
            <ConsentCheckbox
              id="inquiry-consent"
              checked={consent}
              onChange={(c) => {
                setConsent(c);
                if (c) clearError("consent");
              }}
              error={errors.consent}
            >
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. Weitere
              Informationen in der{" "}
              <Link href="/datenschutz" className="text-sage-800 underline underline-offset-2 hover:text-sage-900">
                Datenschutzerklärung
              </Link>
              .
            </ConsentCheckbox>
          </div>
        </Step>

        {/* Mobil: Vorschau aufklappbar vor dem Absenden */}
        <details className="group lg:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-sage-700/20 px-5 py-3 text-center text-sm font-medium text-sage-800 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">E-Mail-Vorschau anzeigen</span>
            <span className="hidden group-open:inline">E-Mail-Vorschau ausblenden</span>
          </summary>
          <div className="mt-4">
            <EmailPreview draft={draft} />
          </div>
        </details>

        <div className="space-y-4">
          <MailtoNotice />
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Send className="size-4" aria-hidden />
            E-Mail vorbereiten
          </Button>
        </div>
      </div>

      <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label="E-Mail-Vorschau">
        <EmailPreview draft={draft} />
        <p className="mt-4 px-2 text-xs leading-relaxed text-ink-muted">
          Unverbindliche Anfrage – du erhältst einen Terminvorschlag per E-Mail.
        </p>
      </aside>
    </form>
  );
}
