import { availabilityConfig } from "@/config/availability";
import { addDays, fromISODate } from "@/lib/dates";
import type { AvailabilityConfig, ISODate, TimeSlot } from "@/types";

/**
 * Schnittstelle für Verfügbarkeiten.
 *
 * Aktuell liefert `createStaticAvailability` die Daten aus
 * `src/config/availability.ts`. Später kann hier z. B. ein Google-Calendar-
 * Provider (über einen Route Handler unter `src/app/api/…`) eingesetzt werden,
 * ohne dass die UI-Komponenten angepasst werden müssen.
 */
export interface AvailabilityProvider {
  /** Alle Zeitfenster eines Tages inkl. Status. Leeres Array = kein Training. */
  getSlots(date: ISODate, now: Date): TimeSlot[];
  /** Erster und letzter Tag, für den angefragt werden kann. */
  getBookableRange(today: ISODate): { first: ISODate; last: ISODate };
}

export function createStaticAvailability(config: AvailabilityConfig): AvailabilityProvider {
  const blocked = new Set(config.blockedDates);
  const booked = new Set(config.bookedSlots.map((s) => `${s.date} ${s.time}`));

  return {
    getBookableRange(today) {
      return { first: today, last: addDays(today, config.bookingWindowDays) };
    },

    getSlots(date, now) {
      if (blocked.has(date)) return [];

      const weekday = fromISODate(date).getDay();
      const extra = config.extraSlots.filter((e) => e.date === date).flatMap((e) => e.times);
      const times = [...new Set([...(config.weeklySchedule[weekday] ?? []), ...extra])].sort();

      const earliest = now.getTime() + config.minLeadTimeHours * 60 * 60 * 1000;

      return times.map((time) => {
        if (booked.has(`${date} ${time}`)) return { time, status: "booked" as const };
        if (fromISODate(date, time).getTime() < earliest) return { time, status: "past" as const };
        return { time, status: "available" as const };
      });
    },
  };
}

export const availability = createStaticAvailability(availabilityConfig);

export const hasAvailableSlot = (slots: TimeSlot[]) => slots.some((s) => s.status === "available");
