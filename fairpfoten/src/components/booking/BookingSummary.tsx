import { CalendarDays, Clock, GraduationCap, User } from "lucide-react";
import type { ReactNode } from "react";
import { Text } from "@/components/ui/Placeholder";
import { addMinutes, formatLongDate } from "@/lib/dates";
import type { TrainingService } from "@/types";

interface BookingSummaryProps {
  service?: TrainingService;
  date: string | null;
  time: string | null;
  name: string;
  durationMinutes: number;
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-sage-600" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-xs tracking-wide text-ink-muted uppercase">{label}</dt>
        <dd className="mt-0.5 font-medium break-words text-sage-900">{children}</dd>
      </div>
    </div>
  );
}

const Empty = () => <span className="font-normal text-ink-muted/70">noch nicht gewählt</span>;

export function BookingSummary({ service, date, time, name, durationMinutes }: BookingSummaryProps) {
  return (
    <div className="rounded-4xl border border-sage-900/6 bg-cream-50 p-6 shadow-soft sm:p-7">
      <h3 className="text-2xl">Deine Anfrage</h3>
      <dl className="mt-5 space-y-4 text-sm" aria-live="polite">
        <Row icon={<GraduationCap className="size-4" />} label="Angebot">
          {service ? <Text>{service.title}</Text> : <Empty />}
        </Row>
        <Row icon={<CalendarDays className="size-4" />} label="Datum">
          {date ? formatLongDate(date) : <Empty />}
        </Row>
        <Row icon={<Clock className="size-4" />} label="Uhrzeit">
          {time ? `${time} – ${addMinutes(time, durationMinutes)} Uhr` : <Empty />}
        </Row>
        <Row icon={<User className="size-4" />} label="Name">
          {name.trim() || <Empty />}
        </Row>
      </dl>
      <p className="mt-6 border-t border-sage-900/8 pt-4 text-xs leading-relaxed text-ink-muted">
        Dies ist eine <strong className="font-semibold text-ink">unverbindliche Anfrage</strong>. Der Termin ist erst
        reserviert, wenn du eine persönliche Bestätigung erhalten hast.
      </p>
    </div>
  );
}
