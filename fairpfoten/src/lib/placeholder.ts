/**
 * Kennzeichnung fehlender Informationen.
 *
 * Alles, was noch nicht bekannt ist, wird mit `placeholder("…")` erzeugt.
 * So ist es im Code per Suche nach "placeholder(" bzw. auf der Website
 * am Präfix "[Platzhalter:" sofort erkennbar.
 */
const PREFIX = "[Platzhalter: ";

export function placeholder(description: string): string {
  return `${PREFIX}${description}]`;
}

export function isPlaceholder(value: string | undefined | null): boolean {
  return typeof value === "string" && value.startsWith(PREFIX);
}
