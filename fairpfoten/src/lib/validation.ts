const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export function validateName(value: string): string | undefined {
  if (!value.trim()) return "Bitte gib deinen Namen an.";
  if (value.trim().length < 2) return "Der Name ist zu kurz.";
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Bitte gib deine E-Mail-Adresse an.";
  if (!EMAIL_PATTERN.test(value.trim())) return "Bitte gib eine gültige E-Mail-Adresse an.";
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  if (!value.trim()) return undefined; // optional
  if (!/^[+\d][\d\s/()-]{5,}$/.test(value.trim())) return "Bitte gib eine gültige Telefonnummer an.";
  return undefined;
}

export function validateRequired(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

export function validateConsent(checked: boolean): string | undefined {
  return checked ? undefined : "Bitte bestätige den Hinweis zum Datenschutz.";
}

export const hasErrors = (errors: Record<string, string | undefined>) =>
  Object.values(errors).some(Boolean);
