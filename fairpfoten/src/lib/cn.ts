/** Kleiner Helfer zum Zusammensetzen von CSS-Klassen (ohne zusätzliche Dependency). */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
