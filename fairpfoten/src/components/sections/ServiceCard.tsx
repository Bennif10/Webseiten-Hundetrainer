import { ArrowRight, Clock, ExternalLink, Users } from "lucide-react";
import Link from "next/link";
import { Text } from "@/components/ui/Placeholder";
import type { TrainingService } from "@/types";

export function ServiceCard({ service, index }: { service: TrainingService; index: number }) {
  return (
    <article className="reveal group flex h-full flex-col rounded-4xl border border-sage-900/6 bg-cream-50 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
      <p className="font-serif text-5xl text-sage-300 italic" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-4 text-2xl leading-snug sm:text-[1.75rem]">
        <Text>{service.title}</Text>
      </h3>
      {service.price && (
        <p className="mt-2 font-serif text-xl text-bark-600">
          <span className="sr-only">Preis: </span>
          {service.price}
        </p>
      )}
      <p className="mt-4 leading-relaxed text-ink-muted">
        <Text>{service.summary}</Text>
      </p>

      <dl className="mt-6 space-y-4 border-t border-sage-900/8 pt-5 text-sm">
        <div>
          <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-sage-800 uppercase">
            <Users className="size-3.5" aria-hidden />
            Für wen
          </dt>
          <dd className="mt-1.5 text-ink-muted">
            <Text>{service.audience}</Text>
          </dd>
        </div>
        {service.duration && (
          <div>
            <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-sage-800 uppercase">
              <Clock className="size-3.5" aria-hidden />
              Dauer
            </dt>
            <dd className="mt-1.5 text-ink-muted">{service.duration}</dd>
          </div>
        )}
      </dl>

      {service.externalUrl ? (
        <a
          href={service.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 self-start pt-7 font-medium text-sage-700 transition-colors hover:text-sage-900"
        >
          Zu den Seminaren der Hundeteamschule
          <ExternalLink className="size-4" aria-hidden />
          <span className="sr-only">(öffnet in neuem Tab)</span>
        </a>
      ) : (
        <Link
          href={`/anfrage?angebot=${encodeURIComponent(service.id)}`}
          className="mt-auto inline-flex items-center gap-2 self-start pt-7 font-medium text-sage-700 transition-colors hover:text-sage-900"
        >
          Anfragen
          <span className="sr-only">: {service.title}</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </article>
  );
}
