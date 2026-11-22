"use client";

import { CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { buildContactEmail, toMailtoUrl } from "@/lib/mail";
import {
  hasErrors,
  validateConsent,
  validateEmail,
  validateName,
  validatePhone,
  validateRequired,
  type FieldErrors,
} from "@/lib/validation";
import { ConsentCheckbox, InputField, TextareaField } from "./Field";
import { MailtoNotice } from "./MailtoNotice";

type Fields = "name" | "email" | "phone" | "message" | "consent";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<Fields>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FieldErrors<Fields> = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      message: validateRequired(values.message, "Bitte schreib mir kurz, worum es geht."),
      consent: validateConsent(consent),
    };
    setErrors(next);
    if (hasErrors(next)) {
      const first = (Object.keys(next) as Fields[]).find((k) => next[k]);
      if (first) document.getElementById(first === "consent" ? "contact-consent" : first)?.focus();
      return;
    }
    window.location.href = toMailtoUrl(
      buildContactEmail({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        message: values.message.trim(),
      }),
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-4xl bg-cream-50 p-8 text-center shadow-soft" role="status">
        <CheckCircle2 className="mx-auto size-10 text-sage-600" aria-hidden />
        <h3 className="mt-4 text-3xl">Fast geschafft!</h3>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Dein E-Mail-Programm sollte sich mit deiner Nachricht geöffnet haben. Bitte sende die E-Mail dort ab.
          Falls sich nichts geöffnet hat, schreib mir einfach direkt.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Zurück zum Formular
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5 rounded-4xl bg-cream-50 p-6 shadow-soft sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField id="name" label="Name" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
        <InputField
          id="email"
          label="E-Mail-Adresse"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>
      <InputField
        id="phone"
        label="Telefon"
        type="tel"
        autoComplete="tel"
        optional
        value={values.phone}
        onChange={set("phone")}
        error={errors.phone}
      />
      <TextareaField
        id="message"
        label="Deine Nachricht"
        placeholder="Erzähl mir gern kurz von dir und deinem Hund …"
        value={values.message}
        onChange={set("message")}
        error={errors.message}
      />
      <ConsentCheckbox
        id="contact-consent"
        checked={consent}
        onChange={(c) => {
          setConsent(c);
          if (c) setErrors((err) => ({ ...err, consent: undefined }));
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
      <MailtoNotice />
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="size-4" aria-hidden />
        Nachricht vorbereiten
      </Button>
    </form>
  );
}
