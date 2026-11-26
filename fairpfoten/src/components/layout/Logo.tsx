import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../public/images/logo.jpg";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Logo (Zeichnung von Elli und Milla) + Wortmarke „Fairpfoten“.
 * Bilddatei: public/images/logo.jpg (320 × 320 px).
 */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} ${siteConfig.subtitle} – zur Startseite`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <Image
        src={logoImage}
        alt=""
        aria-hidden
        priority
        sizes="52px"
        className={cn(
          "size-12 shrink-0 rounded-full bg-white object-cover transition-transform duration-300 group-hover:scale-105 sm:size-13",
          light ? "ring-2 ring-cream-50/20" : "ring-1 ring-sage-900/10",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.65rem] font-semibold italic tracking-tight",
            light ? "text-cream-50" : "text-sage-800",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6rem] font-semibold tracking-[0.32em] uppercase",
            light ? "text-sage-200" : "text-bark-600",
          )}
        >
          {siteConfig.subtitle}
        </span>
      </span>
    </Link>
  );
}
