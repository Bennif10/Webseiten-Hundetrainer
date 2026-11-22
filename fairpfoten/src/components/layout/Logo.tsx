import { PawPrint } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Wortmarke „Fairpfoten“.
 * Sobald das Original-Logo als SVG vorliegt, kann es hier (z. B. via next/image
 * aus /public/images/logo.svg) eingesetzt werden.
 */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} ${siteConfig.subtitle} – zur Startseite`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full transition-colors duration-300",
          light ? "bg-cream-50/10 text-cream-100" : "bg-sage-100 text-sage-700 group-hover:bg-sage-200",
        )}
        aria-hidden
      >
        <PawPrint className="size-4.5" strokeWidth={1.75} />
      </span>
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
