"use client";

import { CalendarX2, CheckCircle2, Copy, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ConsentCheckbox, InputField, TextareaField } from "@/components/forms/Field";
import { MailtoNotice } from "@/components/forms/MailtoNotice";
import { Button } from "@/components/ui/Button";
import { availabilityConfig } from "@/config/availability";
import { siteConfig } from "@/config/site";
import { getServiceById, services } from "@/data/services";
import { availability, hasAvailableSlot } from "@/lib/booking/availability";
import { formatLongDate, monthOf, toISODate, type MonthRef } from "@/lib/dates";
import { buildBookingEmail, toMailtoUrl, type EmailDraft } from "@/lib/mail";
import {
  hasErrors,
  validateConsent,
  validateEmail,
  validateName,
  validatePhone,
  type FieldErrors,
} from "@/lib/validation";
import type { ISODate, TimeOfDay } from "@/types";
import { BookingSummary } from "./BookingSummary";
import { Calendar } from "./Calendar";
import { ServicePicker } from "./ServicePicker";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { useNow } from "./useNow";

type Fields = "service" | "date" | "time" | "name" | "email" | "phone" | "consent";

function Step({ number, title, children, id }: { number: number; title: string; children: ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="rounded-4xl border border-sage-900/6 bg-cream-50/60 p-5 sm:p-7">
      <h2 id={id} className="mb-5 flex items-center gap-3 text-2xl sm:text-[1.7rem]">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage-700 font-sans text-sm font-semibold text-cream-50">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function BookingWidget() {
  const now = useNow();
  const searchParams = useSearchParams();
  const duration = availabilityConfig.slotDurationMinutes;

  const [serviceId, setServiceId] = useState<string | null>(() => {
    const fromUrl = searchParams.get("angebot");
    return fromUrl && getServiceById(fromUrl) ? fromUrl : null;
  });
  const [viewMonth, setViewMonth] = useState<MonthRef | null>(null);
  const [date, setDate] = useState<ISODate | null>(null);
  const [time, setTime] = useState<TimeOfDay | null>(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<Fields>>({});
  const [sentDraft, setSentDraft] = useState<EmailDraft | null>(null);
  const [copied, setCopied] = useState(false);

  const nowDate = useMemo(() => (now === null ? null : new Date(now)), [now]);
  const today = nowDate ? toISODate(nowDate) : null;
  const range = today ? availability.getBookableRange(today) : null;
  const month = viewMonth ?? (today ? monthOf(today) : null);

  const slots = useMemo(
    () => (date && nowDate ? availability.getSlots(date, nowDate) : []),
    [date, nowDate],
  );
  // Falls ein gewählter Slot inzwischen nicht mehr verfügbar ist (Zeit vergeht), Auswahl verwerfen
  const validTime = time && slots.some((s) => s.time === time && s.status === "available") ? time : null;

  const clearError = (key: Fields) => errors[key] && setErrors((e) => ({ ...e, [key]: undefined }));

  const setField = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (key !== "message") clearError(key);
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FieldErrors<Fields> = {
      service: serviceId ? undefined : "Bitte wähle ein Trainingsangebot.",
      date: date ? undefined : "Bitte wähle einen Tag im Kalender.",
      time: date && !validTime ? "Bitte wähle eine Uhrzeit." : undefined,
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      consent: validateConsent(consent),
    };
    setErrors(next);
    if (hasErrors(next) || !serviceId || !date || !validTime) {
      const order: [Fields, string][] = [
        ["service", "step-service"],
        ["date", "step-date"],
        ["time", "step-date"],
        ["name", "booking-name"],
        ["email", "booking-email"],
        ["phone", "booking-phone"],
        ["consent", "booking-consent"],
      ];
      const target = order.find(([k]) => next[k]);
      const el = target && document.getElementById(target[1]);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el instanceof HTMLInputElement) el.focus({ preventScroll: true });
      return;
    }

    const draft = buildBookingEmail(
      {
        serviceId,
        date,
        time: validTime,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        message: values.message.trim() || undefined,
      },
      getServiceById(serviceId),
    );
    window.location.href = toMailtoUrl(draft);
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

  /* ---------- Erfolgsansicht ---------- */
  if (sentDraft) {
    return (
      <div className="mx-auto max-w-2xl rounded-4xl bg-cream-50 p-7 shadow-soft sm:p-10" role="status">
        <CheckCircle2 className="size-11 text-sage-600" aria-hidden />
        <h2 className="mt-4 text-4xl">Fast geschafft!</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Dein E-Mail-Programm sollte sich mit der vorbereiteten Anfrage geöffnet haben.{" "}
          <strong className="font-semibold text-ink">Bitte sende die E-Mail dort ab</strong> – erst dann kommt deine
          Anfrage an. Der Termin ist reserviert, sobald du eine Bestätigung erhalten hast.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Hat sich nichts geöffnet? Dann kopiere die Anfrage und schicke sie an{" "}
          <a href={`mailto:${sentDraft.to}`} className="font-medium break-all text-sage-800 underline">
            {sentDraft.to}
          </a>
          .
        </p>
        <pre className="mt-6 max-h-64 overflow-auto rounded-2xl bg-sage-50 p-4 text-xs leading-relaxed whitespace-pre-wrap text-sage-900">
          {`Betreff: ${sentDraft.subject}\n\n${sentDraft.body}`}
        </pre>
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

  const summary = (
    <BookingSummary
      service={serviceId ? getServiceById(serviceId) : undefined}
      date={date}
      time={validTime}
      name={values.name}
      durationMinutes={duration}
    />
  );

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
      <div className="min-w-0 space-y-6">
        <div id="step-service" className="scroll-mt-28">
          <Step number={1} title="Angebot wählen" id="step-service-title">
            <ServicePicker
              services={services}
              selected={serviceId}
              onSelect={(id) => {
                setServiceId(id);
                clearError("service");
              }}
              error={errors.service}
            />
          </Step>
        </div>

        <div id="step-date" className="scroll-mt-28">
          <Step number={2} title="Tag & Uhrzeit wählen" id="step-date-title">
            {today && range && month ? (
              <div className="grid gap-8 md:max-lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
                <Calendar
                  month={month}
                  onMonthChange={setViewMonth}
                  today={today}
                  lastBookable={range.last}
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setTime(null);
                    clearError("date");
                  }}
                  freeSlotsOn={(d) =>
                    nowDate ? availability.getSlots(d, nowDate).filter((s) => s.status === "available").length : 0
                  }
                />
                <div className="border-t border-sage-900/8 pt-6 md:max-lg:border-t-0 md:max-lg:border-l md:max-lg:pt-0 md:max-lg:pl-8 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8">
                  {date ? (
                    <>
                      <p className="mb-4 font-serif text-xl text-sage-900">{formatLongDate(date)}</p>
                      {slots.length > 0 && hasAvailableSlot(slots) ? (
                        <TimeSlotPicker
                          slots={slots}
                          selected={validTime}
                          onSelect={(t) => {
                            setTime(t);
                            clearError("time");
                          }}
                          durationMinutes={duration}
                          error={errors.time}
                        />
                      ) : (
                        <p className="text-sm text-ink-muted">An diesem Tag sind leider keine Termine mehr frei.</p>
                      )}
                    </>
                  ) : (
                    <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-sage-900/12 p-6 text-center text-sm text-ink-muted">
                      <CalendarX2 className="mb-3 size-7 text-sage-300" aria-hidden />
                      Wähle zuerst einen Tag im Kalender, um die freien Zeitfenster zu sehen.
                    </div>
                  )}
                  {errors.date && (
                    <p className="mt-3 text-sm text-red-800" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-80 animate-pulse rounded-3xl bg-sage-50" aria-label="Kalender wird geladen" />
            )}
          </Step>
        </div>

        <Step number={3} title="Deine Angaben" id="step-details-title">
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                id="booking-name"
                label="Name"
                autoComplete="name"
                value={values.name}
                onChange={setField("name")}
                error={errors.name}
              />
              <InputField
                id="booking-email"
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
              id="booking-phone"
              label="Telefon"
              type="tel"
              autoComplete="tel"
              optional
              hint="Für kurzfristige Rückfragen"
              value={values.phone}
              onChange={setField("phone")}
              error={errors.phone}
            />
            <TextareaField
              id="booking-message"
              label="Nachricht"
              optional
              rows={4}
              placeholder="Erzähl mir gern etwas über deinen Hund und dein Anliegen …"
              value={values.message}
              onChange={setField("message")}
            />
            <ConsentCheckbox
              id="booking-consent"
              checked={consent}
              onChange={(c) => {
                setConsent(c);
                if (c) clearError("consent");
              }}
              error={errors.consent}
            >
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verwendet werden.
              Weitere Informationen in der{" "}
              <Link href="/datenschutz" className="text-sage-800 underline underline-offset-2 hover:text-sage-900">
                Datenschutzerklärung
              </Link>
              .
            </ConsentCheckbox>
          </div>
        </Step>

        <div className="space-y-5 lg:hidden">{summary}</div>

        <div className="space-y-4">
          <MailtoNotice />
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Send className="size-4" aria-hidden />
            Terminanfrage vorbereiten
          </Button>
        </div>
      </div>

      <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label="Zusammenfassung">
        {summary}
        <p className="mt-4 px-2 text-xs leading-relaxed text-ink-muted">
          Fragen vorab? Schreib mir an{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="break-all text-sage-800 underline">
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </aside>
    </form>
  );
}
