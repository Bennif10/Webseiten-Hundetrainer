"use client";

import { CalendarHeart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Menü mit Escape schließen und Scrollen im Hintergrund verhindern
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sage-900/5 bg-cream-100/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream-100/70">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.95rem] transition-colors duration-200",
                      active ? "text-sage-900" : "text-ink-muted hover:text-sage-800",
                      "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:bg-sage-700 after:transition-transform after:duration-300",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/anfrage">
              <CalendarHeart className="size-4" aria-hidden />
              Termin anfragen
            </ButtonLink>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-sage-800 transition-colors hover:bg-sage-100 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobiles Menü */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto border-t border-sage-900/5 bg-cream-100 lg:hidden"
      >
        <nav aria-label="Mobile Navigation" className="px-5 pt-4 pb-10 sm:px-8">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-sage-900/8">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center font-serif text-2xl transition-colors",
                      active ? "text-sage-700 italic" : "text-sage-900 hover:text-sage-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/anfrage" size="lg" onClick={close} className="mt-8 w-full">
            <CalendarHeart className="size-5" aria-hidden />
            Termin anfragen
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
