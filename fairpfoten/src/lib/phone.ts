/** "0159 0237 5617" → "tel:+4915902375617" (internationales Format für Smartphones). */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("0") ? `+49${digits.slice(1)}` : digits}`;
}
