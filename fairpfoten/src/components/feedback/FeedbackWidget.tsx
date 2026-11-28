"use client";

import { CheckCircle2, Copy, Heart } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ConsentCheckbox, InputField, TextareaField } from "@/components/forms/Field";
import { MailtoNotice } from "@/components/forms/MailtoNotice";
import { ChipGroup } from "@/components/inquiry/ChipGroup";
import { EmailPreview } from "@/components/inquiry/EmailPreview";
import { Button } from "@/components/ui/Button";
import { feedbackConfig, ratingCategories } from "@/config/feedback";
import { buildFeedbackEmail, toMailtoUrl, type EmailDraft } from "@/lib/mail";
import { validateConsent, type FieldErrors } from "@/lib/validation";
import type { RatingCategoryId, Ratings } from "@/types";
import { StarInput } from "./StarInput";

type Fields = RatingCategoryId | "publish" | "consent";

export function FeedbackWidget() {
  const [ratings, setRatings] = useState<Partial<Ratings>>({});
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [publish, setPublish] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<Fields>>({});
  const [sentDraft, setSentDraft] = useState<EmailDraft | null>(null);
  const [copied, setCopied] = useState(false);

  const draft = buildFeedbackEmail({ ratings, comment, name, publish: publish[0] });
  const clearError = (key: Fields) => errors[key] && setErrors((e) => ({ ...e, [key]: undefined }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FieldErrors<Fields> = {
      publish: publish.length ? undefined : "Bitte wähle aus, ob dein Feedback veröffentlicht werden darf.",
      consent: validateConsent(consent),
    };
    for (const { id } of ratingCategories) {
      if (!ratings[id]) next[id] = "Bitte vergib 1 bis 5 Sterne.";
    }
    setErrors(next);

    const firstError = [...ratingCategories.map((c) => c.id), "publish", "consent"].find(
      (k) => next[k as Fields],
    );
    if (firstError) {
      const target = firstError === "consent" ? "feedback-consent" : `feedback-${firstError}`;
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
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

  if (sentDraft) {
    return (
      <div className="mx-auto max-w-2xl rounded-4xl bg-cream-50 p-7 shadow-soft sm:p-10" role="status">
        <CheckCircle2 className="size-11 text-sage-600" aria-hidden />
        <h2 className="mt-4 text-4xl">Danke für dein Feedback!</h2>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Dein E-Mail-Programm sollte sich mit deinem Feedback geöffnet haben.{" "}
          <strong className="font-semibold text-ink">Bitte sende die E-Mail dort ab</strong> – erst dann kommt sie an.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Hat sich nichts geöffnet? Dann kopiere dein Feedback und schicke es an{" "}
          <span className="font-medium break-all text-sage-800">{sentDraft.to}</span>.
        </p>
        <div className="mt-6">
          <EmailPreview draft={sentDraft} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={copyDraft}>
            <Copy className="size-4" aria-hidden />
            {copied ? "Kopiert!" : "Feedback kopieren"}
          </Button>
          <Button variant="secondary" onClick={() => setSentDraft(null)}>
            Feedback bearbeiten
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
      <div className="min-w-0 space-y-6">
        <section aria-labelledby="feedback-ratings-title" className="space-y-4">
          <h2 id="feedback-ratings-title" className="text-2xl sm:text-[1.7rem]">
            Wie zufrieden warst du?
          </h2>
          {ratingCategories.map((c) => (
            <div key={c.id} id={`feedback-${c.id}`} className="scroll-mt-28">
              <StarInput
                name={c.id}
                label={c.label}
                question={c.question}
                value={ratings[c.id] ?? 0}
                onChange={(v) => {
                  setRatings((r) => ({ ...r, [c.id]: v }));
                  clearError(c.id);
                }}
                error={errors[c.id]}
              />
            </div>
          ))}
        </section>

        <section aria-labelledby="feedback-comment-title" className="space-y-5">
          <h2 id="feedback-comment-title" className="text-2xl sm:text-[1.7rem]">
            Magst du noch etwas sagen?
          </h2>
          <TextareaField
            id="feedback-comment"
            label="Dein Kommentar"
            optional
            rows={4}
            placeholder="z. B. „Ich fühlte mich exzellent beraten und mein Hund Charlie zieht gar nicht mehr an der Leine.“"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div id="feedback-publish" className="scroll-mt-28 space-y-3">
            <ChipGroup
              legend="Darf ich dein Feedback auf der Website zeigen?"
              name="publish"
              multiple={false}
              options={feedbackConfig.publishOptions}
              selected={publish}
              onChange={(v) => {
                setPublish(v);
                clearError("publish");
              }}
            />
            {errors.publish && (
              <p className="text-sm text-red-800" role="alert">
                {errors.publish}
              </p>
            )}
          </div>
          {publish[0] === feedbackConfig.publishOptions[0] && (
            <InputField
              id="feedback-name"
              label="Wie soll dein Name angezeigt werden?"
              optional
              placeholder="z. B. Anna mit Charlie"
              hint="Leer lassen, dann erscheint dein Feedback anonym."
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <ConsentCheckbox
            id="feedback-consent"
            checked={consent}
            onChange={(c) => {
              setConsent(c);
              if (c) clearError("consent");
            }}
            error={errors.consent}
          >
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meines Feedbacks verwendet werden – und,
            falls ich oben zugestimmt habe, auf der Website veröffentlicht werden. Ich kann das jederzeit widerrufen.
            Mehr in der{" "}
            <Link href="/datenschutz" className="text-sage-800 underline underline-offset-2 hover:text-sage-900">
              Datenschutzerklärung
            </Link>
            .
          </ConsentCheckbox>
        </section>

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
            <Heart className="size-4" aria-hidden />
            Feedback senden
          </Button>
        </div>
      </div>

      <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label="E-Mail-Vorschau">
        <EmailPreview draft={draft} />
      </aside>
    </form>
  );
}
